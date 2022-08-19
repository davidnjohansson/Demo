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
                if (IsValid(entity, validationRule) == false)
                {
                    if (validationRule.Validation.OnlyWarning)
                    {

                    }
                    else
                    {
                        validationErrors.Add(new ValidationError
                        {
                            Message = validationRule.ErrorMessage ?? string.Empty,
                            Property = GetPropertyInfo(entity, validationRule)?.Name ?? string.Empty
                        });
                    }
                }
            }

            return validationErrors;
        }

        private static bool IsValid(IEntity entity, ValidationRule validationRule)
        {
            var prop = GetPropertyInfo(entity, validationRule);

            if (prop == null)
                return false; // Varför false här?

            if (GetComparable(validationRule) == null)
                return false;

            var propValue = prop.GetValue(entity);
            if (propValue == null && validationRule.AllowNull)
                return true;

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
                    return IsValid((IEntity)propValue, validationRule.InverseValidationRule);

                entityCompareValue = ((IEntity)propValue).Id;
            }
            else if (propValue is IEnumerable && (propValue as IEnumerable).OfType<IEntity>().Any())
            {
                if (validationRule.EnumOperation == EnumValidationOperation.AnnanRegelFleraAny)
                {
                    foreach (var item in (IList)propValue)
                    {
                        if (IsValid((IEntity)item, validationRule.InverseValidationRule))
                            return true;
                    }
                    return false;
                }
                else if (validationRule.EnumOperation == EnumValidationOperation.AnnanRegelFleraAll)
                {
                    foreach (var item in (IList)propValue)
                    {
                        if (item is IEntity)
                            if (IsValid((IEntity)item, validationRule.InverseValidationRule) == false)
                                return false;
                    }
                    return true;
                }
            }
            else
                entityCompareValue = propValue as IComparable;

            switch (validationRule.EnumOperation)
            {
                case EnumValidationOperation.Equals:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) == 0;
                case EnumValidationOperation.DoesNotEqual:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) != 0;
                case EnumValidationOperation.LesserThan:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) > 0;
                case EnumValidationOperation.LesserThanOrEqual:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) >= 0;
                case EnumValidationOperation.GreaterThan:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) < 0;
                case EnumValidationOperation.GreaterThanOrEqual:
                    return GetComparable(validationRule).CompareTo(entityCompareValue) <= 0;
                case EnumValidationOperation.Regex:
                    return Regex.Match(entityCompareValue?.ToString() ?? string.Empty, validationRule.RegexPattern).Success;
                case EnumValidationOperation.IsNotNull:
                    return propValue != null;
                case EnumValidationOperation.IsNull:
                    return propValue == null;
            }
            return false;
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

        //public List<ValidationError> Validate(Customer? customer = null, Business? business = null)
        //{
        //    var validationErrors = new List<ValidationError>();

        //    var entities = _db.ChangeTracker
        //        .Entries()
        //        .Where(entityEntry => entityEntry.State == EntityState.Modified)
        //        .Select(entityEntry => entityEntry.Entity)
        //        .OfType<IEntity>()
        //        .ToList();

        //    //
        //    var customerValidations = customer?.ValidationCustomers.Select(validationCustomer => validationCustomer.Validation) ?? Enumerable.Empty<Validation>();

        //    customerValidations = customerValidations.Where(
        //            validation => validation.ValidationBusinesses.Any() == false ||
        //            validation.ValidationBusinesses.Any(validationBusiness => validationBusiness.Business == business));

        //    //
        //    var businessValidations = business?.ValidationBusinesses.Select(validationBusiness => validationBusiness.Validation) ?? Enumerable.Empty<Validation>();

        //    businessValidations = businessValidations.Where(
        //            validation => validation.ValidationCustomers.Any() == false ||
        //            validation.ValidationCustomers.Any(validationCustomer => validationCustomer.Customer == customer));

        //    //
        //    var generalValidations = _db.Validations.Where(validation => validation.General) ?? Enumerable.Empty<Validation>();

        //    //
        //    var validations = customerValidations.Union(businessValidations).Union(generalValidations);

        //    var validationsWithNoGroup = validations
        //        .Where(validation => validation.ValidationGroup == null)
        //        .ToList();

        //    var validationGroups = validations
        //        .Where(validation => validation.ValidationGroup != null)
        //        .Select(validation => validation.ValidationGroup)
        //        .Distinct()
        //        .ToList();

        //    foreach (var entity in entities)
        //    {
        //        foreach (var validation in validationsWithNoGroup)
        //        {
        //            validationErrors.AddRange(Validate(entity, validation));
        //        }

        //        // 
        //    }

        //    return validationErrors;
        //}

        //private static List<ValidationError> Validate(IEntity entity, Validation validation)
        //{
        //    var validationErrors = new List<ValidationError>();

        //    foreach (var validationRule in validation.ValidationRules)
        //    {
        //        var tableName = entity
        //            .GetType()
        //            .GetCustomAttributes(true)
        //            .OfType<TableAttribute>()
        //            .Select(tableAttribute => tableAttribute.Name)
        //            .FirstOrDefault();

        //        if (tableName != validationRule.EntityName) continue;

        //        var validationError = ValidateProperty(entity, validationRule);

        //        if (validationError is not null)
        //        {
        //            validationErrors.Add(validationError);
        //        }
        //    }

        //    return validationErrors;
        //}

        //private static ValidationError? ValidateProperty(IEntity entity, ValidationRule validationRule)
        //{
        //    var property = entity
        //        .GetType()
        //        .GetProperties()
        //        .Where(property => property
        //            .GetCustomAttributes(true)
        //            .OfType<ColumnAttribute>()
        //            .Select(columnAttribute => columnAttribute.Name)
        //            .FirstOrDefault() == validationRule.PropertyName)
        //        .FirstOrDefault();

        //    if (property == null) return null;

        //    var propertyValue = property.GetValue(entity);

        //    if (IsValidPropertyValue(propertyValue, validationRule)) return null;

        //    return new ValidationError
        //    {
        //        Message = validationRule.ErrorMessage ?? string.Empty,
        //        Property = property.Name
        //    };
        //}

        //private static bool IsValidPropertyValue(object? propertyValue, ValidationRule validationRule)
        //{
        //    if (propertyValue == null && validationRule.AllowNull) return true;

        //    if (propertyValue is string propertyValueAsString)
        //    {
        //        if (string.IsNullOrEmpty(propertyValueAsString))
        //        {
        //            propertyValue = null;
        //        }
        //    }

        //    if (propertyValue is int && GetComparable(validationRule) is double)
        //    {
        //        var propertyValueAsInt = propertyValue as int?;
        //        if (propertyValueAsInt.HasValue)
        //        {
        //            propertyValue = Convert.ToDouble(propertyValueAsInt.Value);
        //        }
        //    }

        //    IComparable? entityCompareValue = null;

        //    if (propertyValue is IEntity e)
        //    {
        //        if (validationRule.EnumOperation == EnumValidationOperation.AnnanRegel)
        //        {
        //            return IsValidPropertyValue(e, validationRule.InverseValidationRule!);
        //        }
        //        entityCompareValue = e.Id;
        //    }
        //    else if (propertyValue is IEnumerable && (propertyValue as IEnumerable)!.OfType<IEntity>().Any())
        //    {
        //        if (validationRule.EnumOperation == EnumValidationOperation.AnnanRegelFleraAny)
        //        {
        //            foreach (var item in (IList)propertyValue)
        //            {
        //                if (IsValidPropertyValue((IEntity)item, validationRule.InverseValidationRule!) == false)
        //                {
        //                    return false;
        //                }
        //            }
        //            return true;
        //        }
        //        else if (validationRule.EnumOperation == EnumValidationOperation.AnnanRegelFleraAll)
        //        {
        //            foreach (var item in (IList)propertyValue)
        //            {
        //                if (item is IEntity itemAsEntity)
        //                {
        //                    if (IsValidPropertyValue(itemAsEntity, validationRule.InverseValidationRule!))
        //                    {
        //                        return true;
        //                    }
        //                }
        //            }
        //            return false;
        //        }
        //    }
        //    else
        //    {
        //        entityCompareValue = propertyValue as IComparable;
        //    }

        //    switch (validationRule.EnumOperation)
        //    {
        //        case EnumValidationOperation.Equals:
        //            return GetComparable(validationRule)?.CompareTo(entityCompareValue) == 0;
        //        case EnumValidationOperation.DoesNotEqual:
        //            return GetComparable(validationRule)?.CompareTo(entityCompareValue) != 0;
        //        case EnumValidationOperation.LesserThan:
        //            return GetComparable(validationRule)?.CompareTo(entityCompareValue) > 0;
        //        case EnumValidationOperation.LesserThanOrEqual:
        //            return GetComparable(validationRule)?.CompareTo(entityCompareValue) >= 0;
        //        case EnumValidationOperation.GreaterThan:
        //            return GetComparable(validationRule)?.CompareTo(entityCompareValue) < 0;
        //        case EnumValidationOperation.GreaterThanOrEqual:
        //            return GetComparable(validationRule)?.CompareTo(entityCompareValue) <= 0;
        //        case EnumValidationOperation.Regex:
        //            return Regex.Match(entityCompareValue as string ?? string.Empty, validationRule.RegexPattern!).Success; // GlobalSettings here
        //        case EnumValidationOperation.IsNotNull:
        //            return propertyValue != null;
        //        case EnumValidationOperation.IsNull:
        //            return propertyValue == null;
        //        default:
        //            break;
        //    }

        //    return true;
        //}

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
