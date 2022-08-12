using API.Data;
using API.Entities;
using API.GraphQL;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using T5.API.Types;

namespace API.Services
{
    public class UpsertArbetsplatsInput : Input
    {
        public bool? Aktiv { get; set; }
        public string? ArbetsplatsNamn { get; set; }
        public int? FkKunder { get; set; }
        public string? Adress1 { get; set; }
        public string? Ort { get; set; }
        public string? Postnr { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }

    public class UpsertArbetsplatsService
    {
        private readonly DemoDbContext _db;
        private readonly ITopicEventSender _sender;

        public UpsertArbetsplatsService(DemoDbContext db, ITopicEventSender sender)
        {
            _db = db;
            _sender = sender;
        }

        public async Task<MutationOutput> ValidateAsync(UpsertArbetsplatsInput input)
        {
            var output = new MutationOutput();

            foreach (var property in typeof(UpsertArbetsplatsInput).GetProperties())
            {
                if (property.Name == nameof(input.Pk))
                {
                    if (input.Pk is not null)
                    {
                        var arbetsplatsExists = await _db.Arbetsplatser.AnyAsync(arbetsplats => arbetsplats.Pk == input.Pk);

                        if (arbetsplatsExists is false)
                        {
                            output.ValidationErrors.Add(new ValidationError
                            {
                                Message = "Arbetsplats kunde inte hittas",
                                Property = nameof(input.Pk)
                            });
                        }
                    }
                }
                else if (property.Name == nameof(input.Aktiv))
                {
                    if (input.Aktiv is null)
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Obligatorisk",
                            Property = nameof(input.Aktiv)
                        });
                        continue;
                    }
                }
                else if (property.Name == nameof(input.ArbetsplatsNamn))
                {
                    if (string.IsNullOrWhiteSpace(input.ArbetsplatsNamn))
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Obligatorisk",
                            Property = nameof(input.ArbetsplatsNamn)
                        });
                        continue;
                    }
                }
                else if (property.Name == nameof(input.FkKunder))
                {
                    var kundExists = await _db.Kunder.AnyAsync(kund => kund.Pk == input.FkKunder);

                    if (kundExists is false)
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Kund kunde inte hittas",
                            Property = nameof(input.FkKunder)
                        });
                        continue;
                    }
                }
                else if (property.Name == nameof(input.Adress1))
                {
                    if (string.IsNullOrWhiteSpace(input.Adress1))
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Obligatorisk",
                            Property = nameof(input.Adress1)
                        });
                        continue;
                    }
                }
                else if (property.Name == nameof(input.Ort))
                {
                    if (string.IsNullOrWhiteSpace(input.Ort))
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Obligatorisk",
                            Property = nameof(input.Ort)
                        });
                        continue;
                    }
                }
                else if (property.Name == nameof(input.Postnr))
                {
                    if (string.IsNullOrWhiteSpace(input.Postnr))
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Obligatorisk",
                            Property = nameof(input.Postnr)
                        });
                        continue;
                    }
                }
                else if (property.Name == nameof(input.Latitude))
                {
                    if (input.Latitude is null)
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Obligatorisk",
                            Property = nameof(input.Latitude)
                        });
                        continue;
                    }

                    if (input.Latitude < -90)
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Latitude får inte vara mindre än -90",
                            Property = nameof(input.Latitude)
                        });
                        continue;
                    }

                    if (input.Latitude > 90)
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Latitude får inte vara mer än 90",
                            Property = nameof(input.Latitude)
                        });
                        continue;
                    }
                }
                else if (property.Name == nameof(input.Longitude))
                {
                    if (input.Longitude is null)
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Obligatorisk",
                            Property = nameof(input.Longitude)
                        });
                        continue;
                    }

                    if (input.Longitude < -180)
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Longitude får inte vara mindre än -90",
                            Property = nameof(input.Longitude)
                        });
                        continue;
                    }

                    if (input.Longitude > 180)
                    {
                        output.ValidationErrors.Add(new ValidationError
                        {
                            Message = "Longitude får inte vara mer än 90",
                            Property = nameof(input.Longitude)
                        });
                        continue;
                    }
                }
            }

            return output;
        }

        public async Task<int> ExecuteAsync(UpsertArbetsplatsInput input)
        {
            return input.Pk is null ? await InsertAsync(input) : await UpdateAsync(input);
        }

        private async Task<int> InsertAsync(UpsertArbetsplatsInput input)
        {
            var position = new Positioner
            {
                Latitude = input.Latitude!.Value,
                Longitude = input.Longitude!.Value,
            };

            var adresstyp = (await _db.Adresstyp.FirstOrDefaultAsync(adresstyp => adresstyp.AdresstypNamn == "Arbetsplatsadress"))!;

            var adress = new Adresser
            {
                Adress1 = input.Adress1!,
                FkAdresstypNavigation = adresstyp,
                FkPositionerNavigation = position,
                Ort = input.Ort!,
                Postnr = input.Postnr!
            };

            var kund = (await _db.Kunder.FirstOrDefaultAsync(kund => kund.Pk == input.FkKunder))!;

            var arbetsplats = new Arbetsplatser
            {
                Aktiv = input.Aktiv!.Value,
                ArbetsplatsNamn = input.ArbetsplatsNamn!,
                FkAdresserNavigation = adress,
                FkKunderNavigation = kund
            };

            _db.Arbetsplatser.Add(arbetsplats);

            await _db.SaveChangesAsync();
            await _sender.SendAsync(nameof(Subscription.ArbetsplatsInserted), arbetsplats);

            return arbetsplats.Pk;
        }

        private async Task<int> UpdateAsync(UpsertArbetsplatsInput input)
        {
            var arbetsplats = (await _db.Arbetsplatser.FirstOrDefaultAsync(arbetsplats => arbetsplats.Pk == input.Pk))!;

            var position = arbetsplats.FkAdresserNavigation.FkPositionerNavigation ?? new Positioner();
            position.Latitude = input.Latitude!.Value;
            position.Longitude = input.Longitude!.Value;

            var adress = arbetsplats.FkAdresserNavigation;
            adress.Adress1 = input.Adress1!;
            adress.FkPositionerNavigation = position;
            adress.Ort = input.Ort!;
            adress.Postnr = input.Postnr!;

            var kund = (await _db.Kunder.FirstOrDefaultAsync(kund => kund.Pk == input.FkKunder))!;

            arbetsplats.Aktiv = input.Aktiv!.Value;
            arbetsplats.ArbetsplatsNamn = input.ArbetsplatsNamn!;
            arbetsplats.FkAdresserNavigation = adress;
            arbetsplats.FkKunderNavigation = kund;

            _db.Arbetsplatser.Update(arbetsplats);

            await _db.SaveChangesAsync();
            await _sender.SendAsync(nameof(Subscription.ArbetsplatsUpdated), arbetsplats);

            return arbetsplats.Pk;
        }
    }
}
