using API.Data.Export.Entities;
using API.Data.Export;
using API.GraphQL;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using T5.API.Types;
using API.Exceptions;

namespace API.Services
{
    public class UpsertWorkplaceInput : Input
    {
        public bool? Active { get; set; }
        public string? WorkplaceName { get; set; }
        public int? CustomerId { get; set; }
        public string? Address1 { get; set; }
        public string? City { get; set; }
        public string? ZipCode { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }

    public class UpsertWorkplaceService
    {
        private readonly DemoDbContext _db;
        private readonly ITopicEventSender _sender;

        public UpsertWorkplaceService(DemoDbContext db, ITopicEventSender sender)
        {
            _db = db;
            _sender = sender;
        }

        public async Task<MutationOutput> ValidateAsync(UpsertWorkplaceInput input)
        {
            var output = new MutationOutput();

            foreach (var property in typeof(UpsertWorkplaceInput).GetProperties())
            {
                if (property.Name == nameof(input.Id))
                {
                    if (input.Id is not null)
                    {
                        var workplaceExists = await _db.Workplaces.AnyAsync(workplace => workplace.Id == input.Id);

                        if (workplaceExists is false)
                        {
                            output.ValidationErrors.Add(new ValidationError
                            {
                                Message = "Arbetsplats kunde inte hittas",
                                Property = nameof(input.Id)
                            });
                        }
                    }
                }
                else if (property.Name == nameof(input.Active))
                {
                    if (input.Active is null)
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Obligatorisk",
                            Property = nameof(input.Active)
                        });
                        continue;
                    }
                }
                else if (property.Name == nameof(input.WorkplaceName))
                {
                    if (string.IsNullOrWhiteSpace(input.WorkplaceName))
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Obligatorisk",
                            Property = nameof(input.WorkplaceName)
                        });
                        continue;
                    }
                }
                else if (property.Name == nameof(input.CustomerId))
                {
                    var customerExists = await _db.Customers.AnyAsync(customer => customer.Id == input.CustomerId);

                    if (customerExists is false)
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Kund kunde inte hittas",
                            Property = nameof(input.CustomerId)
                        });
                        continue;
                    }
                }
                else if (property.Name == nameof(input.Address1))
                {
                    if (string.IsNullOrWhiteSpace(input.Address1))
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Obligatorisk",
                            Property = nameof(input.Address1)
                        });
                        continue;
                    }
                }
                else if (property.Name == nameof(input.City))
                {
                    if (string.IsNullOrWhiteSpace(input.City))
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Obligatorisk",
                            Property = nameof(input.City)
                        });
                        continue;
                    }
                }
                else if (property.Name == nameof(input.ZipCode))
                {
                    if (string.IsNullOrWhiteSpace(input.ZipCode))
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Obligatorisk",
                            Property = nameof(input.ZipCode)
                        });
                        continue;
                    }
                }
                //else if (property.Name == nameof(input.Latitude))
                //{
                //    if (input.Latitude is null)
                //    {
                //        output.ValidationErrors.Add(new ValidationError
                //        {
                //            Message = "Obligatorisk",
                //            Property = nameof(input.Latitude)
                //        });
                //        continue;
                //    }

                //    if (input.Latitude < -90)
                //    {
                //        output.ValidationErrors.Add(new ValidationError
                //        {
                //            Message = "Latitude får inte vara mindre än -90",
                //            Property = nameof(input.Latitude)
                //        });
                //        continue;
                //    }

                //    if (input.Latitude > 90)
                //    {
                //        output.ValidationErrors.Add(new ValidationError
                //        {
                //            Message = "Latitude får inte vara mer än 90",
                //            Property = nameof(input.Latitude)
                //        });
                //        continue;
                //    }
                //}
                //else if (property.Name == nameof(input.Longitude))
                //{
                //    if (input.Longitude is null)
                //    {
                //        output.ValidationErrors.Add(new ValidationError
                //        {
                //            Message = "Obligatorisk",
                //            Property = nameof(input.Longitude)
                //        });
                //        continue;
                //    }

                //    if (input.Longitude < -180)
                //    {
                //        output.ValidationErrors.Add(new ValidationError
                //        {
                //            Message = "Longitude får inte vara mindre än -90",
                //            Property = nameof(input.Longitude)
                //        });
                //        continue;
                //    }

                //    if (input.Longitude > 180)
                //    {
                //        output.ValidationErrors.Add(new ValidationError
                //        {
                //            Message = "Longitude får inte vara mer än 90",
                //            Property = nameof(input.Longitude)
                //        });
                //        continue;
                //    }
                //}
            }

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
            var position = new Position
            {
                Latitude = input.Latitude!.Value,
                Longitude = input.Longitude!.Value,
            };

            var addressType = (await _db.AddressTypes.FirstOrDefaultAsync(addressType => addressType.AddressTypeName == "Arbetsplatsadress"))!;

            var address = new Address
            {
                Address1 = input.Address1!,
                AddressType = addressType,
                Position = position,
                City = input.City,
                ZipCode = input.ZipCode
            };

            var customer = (await _db.Customers.FirstOrDefaultAsync(customer => customer.Id == input.CustomerId))!;

            var workplace = new Workplace
            {
                Active = input.Active!.Value,
                WorkplaceName = input.WorkplaceName!,
                Address = address,
                Customer = customer
            };

            _db.Workplaces.Add(workplace);

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (ValidationException ex)
            {
                // Valideringsfel finns i exception.
                // Returnera dessa i output.
                return output;
            }

            await _sender.SendAsync(nameof(Subscription.WorkplaceInserted), workplace);

            output.Id = workplace.Id;

            return output;
        }

        private async Task<MutationOutput> UpdateAsync(UpsertWorkplaceInput input, MutationOutput output)
        {
            var workplace = (await _db.Workplaces.FirstOrDefaultAsync(workplace => workplace.Id == input.Id))!;

            var position = workplace.Address.Position ?? new Position();
            position.Latitude = input.Latitude!.Value;
            position.Longitude = input.Longitude!.Value;

            var address = workplace.Address;
            address.Address1 = input.Address1!;
            address.Position = position;
            address.City = input.City!;
            address.ZipCode = input.ZipCode!;

            var customer = (await _db.Customers.FirstOrDefaultAsync(customer => customer.Id == input.CustomerId))!;

            workplace.Active = input.Active!.Value;
            workplace.WorkplaceName = input.WorkplaceName!;
            workplace.Address = address;
            workplace.Customer = customer;

            _db.Workplaces.Update(workplace);

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (ValidationException ex)
            {
                // Valideringsfel finns i exception.
                // Returnera dessa i output.
                return output;
            }
            
            await _sender.SendAsync(nameof(Subscription.WorkplaceUpdated), workplace);

            output.Id = workplace.Id;

            return output;
        }
    }
}
