using API.Data.DTO;
using API.Data.Export;
using Microsoft.EntityFrameworkCore;
using T5.API.Types;

namespace API.HelperServices
{
    public class BusinessLogicService
    {
        private readonly DemoDbContext _db;

        public BusinessLogicService(DemoDbContext db)
        {
            _db = db;
        }

        public async Task<List<ValidationError>> ValidateAsync(UpsertWorkplaceInput input)
        {
            var validationErrors = new List<ValidationError>();

            if (input.CustomerId.GetValueOrDefault(0) == 0)
            {
                validationErrors.Add(new ValidationError
                {
                    Message = "CustomerId is required",
                    TypeName = nameof(UpsertWorkplaceInput),
                    PropertyName = nameof(input.CustomerId),
                });
            }

            var customerExists = await _db.Customers.AnyAsync(customer => customer.Id == input.CustomerId);

            if (customerExists == false)
            {
                validationErrors.Add(new ValidationError
                {
                    Message = $"Customer with id {input.CustomerId} not found",
                    TypeName = nameof(UpsertWorkplaceInput),
                    PropertyName = nameof(input.CustomerId),
                });
            }

            return validationErrors;
        }

        public List<ValidationError> Validate(UpsertAddressInput input)
        {
            var validationErrors = new List<ValidationError>();

            if (string.IsNullOrWhiteSpace(input.Address1))
            {
                validationErrors.Add(new ValidationError
                {
                    Message = "Address1 is required",
                    TypeName = nameof(UpsertAddressInput),
                    PropertyName = nameof(input.Address1),
                });
            }

            if (string.IsNullOrWhiteSpace(input.ZipCode))
            {
                validationErrors.Add(new ValidationError
                {
                    Message = "ZipCode is required",
                    TypeName = nameof(UpsertAddressInput),
                    PropertyName = nameof(input.ZipCode),
                });
            }

            if (string.IsNullOrWhiteSpace(input.City))
            {
                validationErrors.Add(new ValidationError
                {
                    Message = "City is required",
                    TypeName = nameof(UpsertAddressInput),
                    PropertyName = nameof(input.City),
                });
            }

            return validationErrors;
        }

        public List<ValidationError> Validate(UpsertPositionInput input)
        {
            var validationErrors = new List<ValidationError>();

            if (input.Latitude == null)
            {
                validationErrors.Add(new ValidationError
                {
                    Message = "Latitude is required",
                    TypeName = nameof(UpsertPositionInput),
                    PropertyName = nameof(input.Latitude),
                });
            }

            if (input.Longitude == null)
            {
                validationErrors.Add(new ValidationError
                {
                    Message = "Longitude is required",
                    TypeName = nameof(UpsertPositionInput),
                    PropertyName = nameof(input.Longitude),
                });
            }

            return validationErrors;
        }
    }
}
