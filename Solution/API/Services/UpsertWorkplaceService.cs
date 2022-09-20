using API.Data.Export.Entities;
using API.Data.Export;
using API.GraphQL;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using T5.API.Types;
using API.HelperServices;
using API.Data.DTO;

namespace API.Services
{
    public class UpsertWorkplaceService
    {
        private readonly DemoDbContext _db;
        private readonly ITopicEventSender _sender;
        private readonly BusinessLogicService _businessLogicService;
        private readonly ValidationService _validationService;

        public UpsertWorkplaceService(DemoDbContext db, ITopicEventSender sender, BusinessLogicService businessLogicService, ValidationService validationService)
        {
            _db = db;
            _sender = sender;
            _businessLogicService = businessLogicService;
            _validationService = validationService;
        }

        public async Task<MutationOutput> ValidateAsync(UpsertWorkplaceInput input)
        {
            var output = new MutationOutput();

            //foreach (var property in typeof(UpsertWorkplaceInput).GetProperties())
            //{
            //    if (property.Name == nameof(input.Id))
            //    {
            //        if (input.Id is not null)
            //        {
            //            var workplaceExists = await _db.Workplaces.AnyAsync(workplace => workplace.Id == input.Id);

            //            if (workplaceExists is false)
            //            {
            //                output.ValidationErrors.Add(new ValidationError
            //                {
            //                    Message = "Arbetsplats kunde inte hittas",
            //                    Property = nameof(input.Id)
            //                });
            //            }
            //        }
            //    }
            //    else if (property.Name == nameof(input.Active))
            //    {
            //        if (input.Active is null)
            //        {
            //            output.ValidationErrors.Add(new ValidationError
            //            {
            //                Message = "Obligatorisk",
            //                Property = nameof(input.Active)
            //            });
            //            continue;
            //        }
            //    }
            //    else if (property.Name == nameof(input.WorkplaceName))
            //    {
            //        if (string.IsNullOrWhiteSpace(input.WorkplaceName))
            //        {
            //            output.ValidationErrors.Add(new ValidationError
            //            {
            //                Message = "Obligatorisk",
            //                Property = nameof(input.WorkplaceName)
            //            });
            //            continue;
            //        }
            //    }
            //    else if (property.Name == nameof(input.CustomerId))
            //    {
            //        var customerExists = await _db.Customers.AnyAsync(customer => customer.Id == input.CustomerId);

            //        if (customerExists is false)
            //        {
            //            output.ValidationErrors.Add(new ValidationError
            //            {
            //                Message = "Kund kunde inte hittas",
            //                Property = nameof(input.CustomerId)
            //            });
            //            continue;
            //        }
            //    }
            //    else if (property.Name == nameof(input.Address1))
            //    {
            //        if (string.IsNullOrWhiteSpace(input.Address1))
            //        {
            //            output.ValidationErrors.Add(new ValidationError
            //            {
            //                Message = "Obligatorisk",
            //                Property = nameof(input.Address1)
            //            });
            //            continue;
            //        }
            //    }
            //    else if (property.Name == nameof(input.City))
            //    {
            //        if (string.IsNullOrWhiteSpace(input.City))
            //        {
            //            output.ValidationErrors.Add(new ValidationError
            //            {
            //                Message = "Obligatorisk",
            //                Property = nameof(input.City)
            //            });
            //            continue;
            //        }
            //    }
            //    else if (property.Name == nameof(input.ZipCode))
            //    {
            //        if (string.IsNullOrWhiteSpace(input.ZipCode))
            //        {
            //            output.ValidationErrors.Add(new ValidationError
            //            {
            //                Message = "Obligatorisk",
            //                Property = nameof(input.ZipCode)
            //            });
            //            continue;
            //        }
            //    }
            //    else if (property.Name == nameof(input.Latitude))
            //    {
            //        if (input.Latitude is null)
            //        {
            //            output.ValidationErrors.Add(new ValidationError
            //            {
            //                Message = "Obligatorisk",
            //                Property = nameof(input.Latitude)
            //            });
            //            continue;
            //        }

            //        if (input.Latitude < -90)
            //        {
            //            output.ValidationErrors.Add(new ValidationError
            //            {
            //                Message = "Latitude får inte vara mindre än -90",
            //                Property = nameof(input.Latitude)
            //            });
            //            continue;
            //        }

            //        if (input.Latitude > 90)
            //        {
            //            output.ValidationErrors.Add(new ValidationError
            //            {
            //                Message = "Latitude får inte vara mer än 90",
            //                Property = nameof(input.Latitude)
            //            });
            //            continue;
            //        }
            //    }
            //    else if (property.Name == nameof(input.Longitude))
            //    {
            //        if (input.Longitude is null)
            //        {
            //            output.ValidationErrors.Add(new ValidationError
            //            {
            //                Message = "Obligatorisk",
            //                Property = nameof(input.Longitude)
            //            });
            //            continue;
            //        }

            //        if (input.Longitude < -180)
            //        {
            //            output.ValidationErrors.Add(new ValidationError
            //            {
            //                Message = "Longitude får inte vara mindre än -90",
            //                Property = nameof(input.Longitude)
            //            });
            //            continue;
            //        }

            //        if (input.Longitude > 180)
            //        {
            //            output.ValidationErrors.Add(new ValidationError
            //            {
            //                Message = "Longitude får inte vara mer än 90",
            //                Property = nameof(input.Longitude)
            //            });
            //            continue;
            //        }
            //    }
            //}

            return output;
        }

        public async Task<MutationOutput> ExecuteAsync(UpsertWorkplaceInput input)
        {
            var output = new MutationOutput();

            if (input.Id is null)
            {
                output = await InsertAsync(input, output);
            }
            else
            {
                output = await UpdateAsync(input, output);
            }

            return output;
        }

        private async Task<MutationOutput> InsertAsync(UpsertWorkplaceInput input, MutationOutput output)
        {
            output.ValidationErrors.AddRange(await _businessLogicService.ValidateAsync(input));

            if (output.ValidationErrors.Any()) return output;

            var workplace = new Workplace
            {
                Active = input.Active!.Value,
                WorkplaceName = input.WorkplaceName!,
                CustomerId = input.CustomerId!.Value
            };

            output.ValidationErrors.AddRange(_businessLogicService.Validate(input.UpsertAddressInput!));

            if (output.ValidationErrors.Any()) return output;

            workplace.Address = new Address
            {
                Address1 = input.UpsertAddressInput!.Address1,
                AddressType = (await _db.AddressTypes.FirstOrDefaultAsync(addressType => addressType.AddressTypeName == "Arbetsplatsadress"))!,
                City = input.UpsertAddressInput!.City,
                ZipCode = input.UpsertAddressInput!.ZipCode
            };

            output.ValidationErrors.AddRange(_businessLogicService.Validate(input.UpsertAddressInput!.UpsertPositionInput!));

            if (!output.ValidationErrors.Any())
            {
                workplace.Address.Position = new Position
                {
                    Latitude = input.UpsertAddressInput!.UpsertPositionInput!.Latitude!.Value,
                    Longitude = input.UpsertAddressInput!.UpsertPositionInput!.Longitude!.Value
                };
            }

            output.ValidationErrors.AddRange(_validationService.Validate(workplace));

            if (input.OnlyValidate == true) return output;

            _db.Workplaces.Add(workplace);

            await _db.SaveChangesAsync();
            await _sender.SendAsync(nameof(Subscription.WorkplaceInserted), workplace);

            output.Id = workplace.Id;

            return output;
        }

        private async Task<MutationOutput> UpdateAsync(UpsertWorkplaceInput input, MutationOutput output)
        {
            //var workplace = (await _db.Workplaces.FirstOrDefaultAsync(workplace => workplace.Id == input.Id))!;

            //var position = workplace.Address.Position ?? new Position();
            //position.Latitude = input.Latitude!.Value;
            //position.Longitude = input.Longitude!.Value;

            //var address = workplace.Address;
            //address.Address1 = input.Address1!;
            //address.Position = position;
            //address.City = input.City!;
            //address.ZipCode = input.ZipCode!;

            //var customer = (await _db.Customers.FirstOrDefaultAsync(customer => customer.Id == input.CustomerId))!;

            //workplace.Active = input.Active!.Value;
            //workplace.WorkplaceName = input.WorkplaceName!;
            //workplace.Address = address;
            //workplace.Customer = customer;

            //_db.Workplaces.Update(workplace);

            //output.ValidationErrors.AddRange(_validationService.Validate(workplace));

            //if (output.ValidationErrors.Any()) return output;

            //await _db.SaveChangesAsync();
            //await _sender.SendAsync(nameof(Subscription.WorkplaceUpdated), workplace);

            //output.Id = workplace.Id;

            return output;
        }
    }
}
