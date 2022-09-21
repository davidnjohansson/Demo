using API.Attributes;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("KONTAKTER")]
    public class Contact : IEntity
    {
        [Column("PK")]
        public int Id { get; set; }

        [Column("KontaktNamn")]
        public string? ContactName { get; set; }

        [Column("Avdelning")]
        public string? Department { get; set; }

        [Column("Aktiv")]
        public bool? Active { get; set; }

        [Column("GDPR_Raderad")]
        public string? GDPR_Deleted { get; set; }

        [Column("FK_KUNDER")]
        public int CustomerId { get; set; }
        [Navigation("_FK_KUNDER")]
        public virtual Customer Customer { get; set; } = null!;

        [Column("FK_PERSONER")]
        public int? PersonId { get; set; }
        [Navigation("_FK_PERSONER")]
        public virtual Person? Person { get; set; }

        [Navigation("ARBETSPLATSER__FK_KONTAKT")]
        public virtual ICollection<Workplace> Workplaces { get; set; } = new HashSet<Workplace>();

        public virtual ICollection<ContactWorkplace> ContactWorkplaces { get; set; } = new HashSet<ContactWorkplace>();
    }
}
