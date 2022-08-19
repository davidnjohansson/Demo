using API.Attributes;
using API.Data.Export;
using API.Data.Export.Entities;
using API.Enums;
using API.Extensions;
using API.Interfaces;
using System.Collections;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using System.Text.RegularExpressions;
using T5.API.Types;

namespace API.HelperServices
{
    public class ValidationService
    {
        private readonly DemoDbContext _db;

        public ValidationService(DemoDbContext db)
        {
            _db = db;
        }

        public List<ValidationError> Validate(IEntity entity, Customer? customer = null, Operation? operation = null)
        {
            var validationErrors = new List<ValidationError>();

            var customerValidations = customer?.ValidationCustomers.Select(validationCustomer => validationCustomer.Validation) ?? Enumerable.Empty<Validation>();

            customerValidations = customerValidations
                .Where(validation => validation.ValidationOperations.Any() == false || validation.ValidationOperations.Any(validationBusiness => validationBusiness.Operation == operation));

            var operationValidations = operation?.ValidationOperations.Select(validationOperation => validationOperation.Validation) ?? Enumerable.Empty<Validation>();

            operationValidations = operationValidations
                .Where(validation => validation.ValidationCustomers.Any() == false || validation.ValidationCustomers.Any(validationCustomer => validationCustomer.Customer == customer));

            var generalValidations = _db.Validations.Where(validation => validation.General) ?? Enumerable.Empty<Validation>();

            var validations = customerValidations.Union(operationValidations).Union(generalValidations).ToList();

            // Kontrollera först de utan grupp.
            foreach (var validation in validations.Where(validation => validation.ValidationGroup == null))
            {
                validationErrors.AddRange(Validate(entity, validation));
            }

            return validationErrors;
        }

        private List<ValidationError> Validate(IEntity entity, Validation validation)
        {
            var validationErrors = new List<ValidationError>();

            var entityName = entity
                .GetType()
                .GetCustomAttributes(true)
                .OfType<TableAttribute>()
                .Select(tableAttribute => tableAttribute.Name)
                .FirstOrDefault();

            var validationRules = _db.ValidationRules
                .Where(validationRule => validationRule.EntityName == entityName)
                .Where(validationRule => validationRule.Validation == validation)
                .ToList();

            foreach (var validationRule in validationRules)
            {
                var validationError = ValidateProperty(entity, validationRule);

                if (validationError is not null)
                {
                    validationErrors.Add(validationError);
                }
            }

            return validationErrors;
        }

        private static ValidationError? ValidateProperty(IEntity entity, ValidationRule validationRule)
        {
            var prop = GetPropertyInfo(entity, validationRule);

            if (prop == null)
            {
                return new ValidationError
                {
                    Message = $"Property {validationRule.PropertyName} kan inte hittas på entitet {validationRule.EntityName}",
                    Property = string.Empty
                };
            }

            if (GetComparable(validationRule) == null)
            {
                return new ValidationError
                {
                    Message = $"Kunde inte hitta en IComparable",
                    Property = prop.Name
                };
            }

            var propValue = prop.GetValue(entity);
            if (propValue == null && validationRule.AllowNull)
                return null;

            if (propValue is string)
                if (string.IsNullOrEmpty((string)propValue))
                    propValue = null;

            if (propValue is int && GetComparable(validationRule) is double)
            {
                var propAsInt = propValue as int?;
                if (propAsInt.HasValue)
                    propValue = Convert.ToDouble(propAsInt.Value);
            }

            IComparable? entityCompareValue = null;
            if (propValue is IEntity)
            {
                if (validationRule.EnumOperation == EnumValidationOperation.AnnanRegel)
                    return ValidateProperty((IEntity)propValue, validationRule.InverseValidationRule);

                entityCompareValue = ((IEntity)propValue).Id;
            }
            else if (propValue is IEnumerable && (propValue as IEnumerable).OfType<IEntity>().Any())
            {
                if (validationRule.EnumOperation == EnumValidationOperation.AnnanRegelFleraAny)
                {
                    foreach (var item in (IList)propValue)
                    {
                        if (ValidateProperty((IEntity)item, validationRule.InverseValidationRule) == null)
                        {
                            return null;
                        }
                    }
                    return new ValidationError
                    {
                        Message = "Fråga Sebastian hur det här felet uppstår?",
                        Property = prop.Name
                    };
                }
                else if (validationRule.EnumOperation == EnumValidationOperation.AnnanRegelFleraAll)
                {
                    foreach (var item in (IList)propValue)
                    {
                        if (item is IEntity)
                        {
                            if (ValidateProperty((IEntity)item, validationRule.InverseValidationRule) is not null)
                            {
                                return new ValidationError
                                {
                                    Message = "Fråga Sebastian hur det här felet uppstår?",
                                    Property = prop.Name
                                };
                            }
                        }
                    }
                    return null;
                }
            }
            else
                entityCompareValue = propValue as IComparable;

            switch (validationRule.EnumOperation)
            {
                case EnumValidationOperation.Equals:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) == 0 ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.DoesNotEqual:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) != 0 ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.LesserThan:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) > 0 ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.LesserThanOrEqual:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) >= 0 ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.GreaterThan:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) < 0 ? null : GetValidationError(prop, validationRule) ;
                case EnumValidationOperation.GreaterThanOrEqual:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) <= 0 ? null : GetValidationError(prop, validationRule) ;
                case EnumValidationOperation.Regex:
                    return Regex.Match(entityCompareValue?.ToString() ?? string.Empty, validationRule.RegexPattern).Success ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.IsNotNull:
                    return propValue != null ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.IsNull:
                    return propValue == null ? null : GetValidationError(prop, validationRule);
            }
            return new ValidationError
            {
                Message = "Fråga Sebastian hur det här felet uppstår?",
                Property = prop.Name
            };
        }

        private static PropertyInfo? GetPropertyInfo(IEntity entity, ValidationRule validationRule)
        {
            var propertyInfo = entity
                .GetType()
                .GetProperties()
                .Where(
                    property =>
                        property.GetCustomAttribute<PropertyAttribute>()?.Name == validationRule.PropertyName ||
                        property.GetCustomAttribute<ColumnAttribute>()?.Name == validationRule.PropertyName)
                .FirstOrDefault();

            return propertyInfo;
        }

        private static ValidationError GetValidationError(PropertyInfo propertyInfo, ValidationRule validationRule)
        {
            return new ValidationError
            {
                Message = validationRule.ErrorMessage ?? string.Empty,
                Property = propertyInfo.Name
            };
        }

        private static IComparable? GetComparable(ValidationRule validationRule)
        {
            if (validationRule.EnumOperation.EqualsAny(EnumValidationOperation.IsNull, EnumValidationOperation.IsNotNull))
            {
                return string.Empty;
            }
            else if (validationRule.ValueNumeric.HasValue)
            {
                return validationRule.ValueNumeric;
            }
            else if (validationRule.ValueDateTime.HasValue)
            {
                return validationRule.ValueDateTime;
            }
            else if (validationRule.ValueForeignKey.HasValue)
            {
                return validationRule.ValueForeignKey;
            }
            else if (validationRule.ValueBoolean.HasValue)
            {
                return validationRule.ValueBoolean;
            }
            else if (!string.IsNullOrEmpty(validationRule.ValueAlphanumeric))
            {
                return validationRule.ValueAlphanumeric;
            }
            else if (!string.IsNullOrEmpty(validationRule.RegexPattern))
            {
                return validationRule.RegexPattern;
            }
            else if (validationRule.InverseValidationRuleId.HasValue)
            {
                return validationRule.InverseValidationRuleId;
            }
            else
            {
                return null;
            }
        }
    }
}
