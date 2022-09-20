﻿using API.Attributes;
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

            var customerValidations = customer?.ValidationCustomers
                .Select(validationCustomer => validationCustomer.Validation) ?? Enumerable.Empty<Validation>();

            customerValidations = customerValidations
                .Where(validation => validation.ValidationOperations.Any() == false || validation.ValidationOperations.Any(validationBusiness => validationBusiness.Operation == operation));

            var operationValidations = operation?.ValidationOperations
                .Select(validationOperation => validationOperation.Validation) ?? Enumerable.Empty<Validation>();

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
                    PropertyName = string.Empty
                };
            }

            if (GetComparable(validationRule) == null)
            {
                return new ValidationError
                {
                    Message = $"Kunde inte hitta en IComparable för {prop.Name}",
                    PropertyName = prop.Name
                };
            }

            var propValue = prop.GetValue(entity);
            if (propValue == null && validationRule.AllowNull)
            {
                return null;
            }

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
            else if (typeof(IEnumerable<IEntity>).IsAssignableFrom(prop.PropertyType))
            {
                if (!(propValue is IEnumerable<IEntity> propValueAsEnumerable))
                {
                    return new ValidationError
                    {
                        Message = "Property är av typ IEnumerable<IEntity> men dess värde är null, kan ej utvärdera valideringsregel",
                        PropertyName = prop.Name
                    };
                }

                if (propValueAsEnumerable.Any() == false && validationRule.AllowNull == false)
                {
                    return new ValidationError
                    {
                        Message = "IEnumerable<IEntity> är tom och 'Giltig vid tomt värde' är inte valt",
                        PropertyName = prop.Name
                    };
                }

                switch (validationRule.EnumOperation)
                {
                    case EnumValidationOperation.AnnanRegelFleraAny:
                    {
                        foreach (var item in propValueAsEnumerable)
                        {
                            if (ValidateProperty(item, validationRule.InverseValidationRule) is null)
                                return null;
                        }

                        return GetValidationError(prop, validationRule);
                    }
                    case EnumValidationOperation.AnnanRegelFleraAll:
                    {
                        foreach (var item in propValueAsEnumerable)
                        {
                            if (item is IEntity)
                            {
                                if (ValidateProperty(item, validationRule.InverseValidationRule) is ValidationError validationError)
                                {
                                    return validationError;
                                }
                            }
                        }

                        return null;
                    }
                    case EnumValidationOperation.Count:
                        return propValueAsEnumerable.Count() == (double)(GetComparable(validationRule) ?? 0) ? null : GetValidationError(prop, validationRule);
                    case EnumValidationOperation.NotCount:
                        return propValueAsEnumerable.Count() != (double)(GetComparable(validationRule) ?? 0) ? null : GetValidationError(prop, validationRule);
                    case EnumValidationOperation.CountIsMoreThan:
                        return propValueAsEnumerable.Count() > (double)(GetComparable(validationRule) ?? 0) ? null : GetValidationError(prop, validationRule);
                    case EnumValidationOperation.CountIsMoreThanOrEqual:
                        return propValueAsEnumerable.Count() >= (double)(GetComparable(validationRule) ?? 0) ? null : GetValidationError(prop, validationRule);
                    case EnumValidationOperation.CountIsLessThan:
                        return propValueAsEnumerable.Count() < (double)(GetComparable(validationRule) ?? 0) ? null : GetValidationError(prop, validationRule);
                    case EnumValidationOperation.CountIsLessThanOrEqual:
                        return propValueAsEnumerable.Count() <= (double)(GetComparable(validationRule) ?? 0) ? null : GetValidationError(prop, validationRule);
                }
            }
            else
            {
                entityCompareValue = propValue as IComparable;
            }

            switch (validationRule.EnumOperation)
            {
                case EnumValidationOperation.Equals:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) == 0 ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.DoesNotEqual:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) != 0 ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.GreaterThan:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) < 0 ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.GreaterThanOrEqual:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) <= 0 ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.LesserThan:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) > 0 ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.LesserThanOrEqual:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) >= 0 ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.MatchesRegex:
                    return Regex.Match(entityCompareValue?.ToString() ?? string.Empty, validationRule.RegexPattern).Success ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.DoesNotMatchRegex:
                    return !Regex.Match(entityCompareValue?.ToString() ?? string.Empty, validationRule.RegexPattern).Success ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.IsNull:
                    return propValue == null ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.IsNotNull:
                    return propValue != null ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.Contains:
                    return (entityCompareValue as string ?? string.Empty).ToLower().Contains((GetComparable(validationRule) as string ?? string.Empty).ToLower()) ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.DoesNotContain:
                    return !(entityCompareValue as string ?? string.Empty).ToLower().Contains((GetComparable(validationRule) as string ?? string.Empty).ToLower()) ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.LongerThan:
                    return (entityCompareValue as string ?? string.Empty).Length > (double)(GetComparable(validationRule) ?? 0) ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.LongerThanOrEqual:
                    return (entityCompareValue as string ?? string.Empty).Length >= (double)(GetComparable(validationRule) ?? 0) ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.ShorterThan:
                    return (entityCompareValue as string ?? string.Empty).Length < (double)(GetComparable(validationRule) ?? 0) ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.ShorterThanOrEqual:
                    return (entityCompareValue as string ?? string.Empty).Length <= (double)(GetComparable(validationRule) ?? 0) ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.StartsWith:
                    return (entityCompareValue as string ?? string.Empty).ToLower().StartsWith((GetComparable(validationRule) as string ?? string.Empty).ToLower()) ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.DoesNotStartWith:
                    return !(entityCompareValue as string ?? string.Empty).ToLower().StartsWith((GetComparable(validationRule) as string ?? string.Empty).ToLower()) ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.EndsWith:
                    return (entityCompareValue as string ?? string.Empty).ToLower().EndsWith((GetComparable(validationRule) as string ?? string.Empty).ToLower()) ? null : GetValidationError(prop, validationRule);
                case EnumValidationOperation.DoesNotEndWith:
                    return !(entityCompareValue as string ?? string.Empty).ToLower().EndsWith((GetComparable(validationRule) as string ?? string.Empty).ToLower()) ? null : GetValidationError(prop, validationRule);
            }

            return new ValidationError
            {
                Message = "Kunde inte hitta någon valideringsoperation",
                PropertyName = prop.Name
            };
        }

        private static PropertyInfo? GetPropertyInfo(IEntity entity, ValidationRule validationRule)
        {
            var propertyInfo = entity
                .GetType()
                .GetProperties()
                .Where(
                    property =>
                        property.GetCustomAttribute<NavigationAttribute>()?.Name == validationRule.PropertyName ||
                        property.GetCustomAttribute<ColumnAttribute>()?.Name == validationRule.PropertyName)
                .FirstOrDefault();

            return propertyInfo;
        }

        private static ValidationError GetValidationError(PropertyInfo propertyInfo, ValidationRule validationRule)
        {
            return new ValidationError
            {
                Message = validationRule.ErrorMessage ?? string.Empty,
                PropertyName = propertyInfo.Name
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
