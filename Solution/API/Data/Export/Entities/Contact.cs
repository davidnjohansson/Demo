using API.Attributes;
using API.Data.Import.Entities;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(KONTAKTER))]
    public class Contact : IEntity
    {
        [Column(nameof(KONTAKTER.PK))]
        public int Id { get; set; }

        [Column(nameof(KONTAKTER.KontaktNamn))]
        public string? ContactName { get; set; }

        [Column(nameof(KONTAKTER.Avdelning))]
        public string? Department { get; set; }

        [Column(nameof(KONTAKTER.Aktiv))]
        public bool? Active { get; set; }

        [Column(nameof(KONTAKTER.GDPR_Raderad))]
        public string? GDPR_Deleted { get; set; }

        [Column(nameof(KONTAKTER.FK_KUNDER))]
        public int CustomerId { get; set; }
        [Property(nameof(KONTAKTER.FK_KUNDER))]
        public virtual Customer Customer { get; set; } = null!;

        [Column(nameof(KONTAKTER.FK_PERSONER))]
        public int? PersonId { get; set; }
        [Property(nameof(KONTAKTER.FK_PERSONER))]
        public virtual Person? Person { get; set; }

        public virtual ICollection<Workplace> Workplaces { get; set; } = new HashSet<Workplace>();
    }
}
