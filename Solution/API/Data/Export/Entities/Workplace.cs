using API.Attributes;
using API.Data.Import.Entities;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(ARBETSPLATSER))]
    public class Workplace : IEntity
    {
        [Column(nameof(ARBETSPLATSER.PK))]
        public int Id { get; set; }

        [Column(nameof(ARBETSPLATSER.Aktiv))]
        public bool? Active { get; set; }

        [Column(nameof(ARBETSPLATSER.ArbetsplatsNamn))]
        public string WorkplaceName { get; set; } = null!;

        [Column(nameof(ARBETSPLATSER.FK_ADRESSER))]
        public int AddressId { get; set; }
        [Navigation(nameof(ARBETSPLATSER.FK_ADRESSER))]
        public virtual Address Address { get; set; } = null!;

        [Column(nameof(ARBETSPLATSER.FK_KUNDER))]
        public int CustomerId { get; set; }
        [Navigation(nameof(ARBETSPLATSER.FK_KUNDER))]
        public virtual Customer Customer { get; set; } = null!;

        [Column(nameof(ARBETSPLATSER.FK_POSITIONER))]
        public int? PositionId { get; set; }
        [Navigation(nameof(ARBETSPLATSER.FK_POSITIONER))]
        public virtual Position? Position { get; set; }

        [Column(nameof(ARBETSPLATSER.FK_KONTAKT))]
        public int? ContactId { get; set; }
        [Navigation(nameof(ARBETSPLATSER.FK_KONTAKT))]
        public virtual Contact? Contact { get; set; }

        public virtual ICollection<ContactWorkplace> ContactWorkplaces { get; set; } = new HashSet<ContactWorkplace>();

        public virtual ICollection<WorkplaceOwner> WorkplaceOwners { get; set; } = new HashSet<WorkplaceOwner>();
    }
}
