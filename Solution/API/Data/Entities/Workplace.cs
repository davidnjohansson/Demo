using API.Attributes;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("ARBETSPLATSER")]
    public class Workplace : IEntity
    {
        [Column("PK")]
        public int Id { get; set; }

        [Column("Aktiv")]
        public bool? Active { get; set; }

        [Column("ArbetsplatsNamn")]
        public string WorkplaceName { get; set; } = null!;

        [Column("FK_ADRESSER")]
        public int AddressId { get; set; }
        [Navigation("_FK_ADRESSER")]
        public virtual Address Address { get; set; } = null!;

        [Column("FK_KUNDER")]
        public int CustomerId { get; set; }
        [Navigation("_FK_KUNDER")]
        public virtual Customer Customer { get; set; } = null!;

        [Column("FK_KONTAKT")]
        public int? ContactId { get; set; }
        [Navigation("_FK_KONTAKT")]
        public virtual Contact? Contact { get; set; }

        [Navigation("Kontakter")]
        public virtual ICollection<ContactWorkplace> ContactWorkplaces { get; set; } = new HashSet<ContactWorkplace>();

        [Navigation("ARBETSPLATSER_AGARE")]
        public virtual ICollection<WorkplaceOwner> WorkplaceOwners { get; set; } = new HashSet<WorkplaceOwner>();
    }
}
