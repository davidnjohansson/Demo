using API.Data.Import.Entities;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(VERKSAMHETER))]
    public class Business : IEntity
    {
        [Column(nameof(VERKSAMHETER.PK))]
        public int Id { get; set; }

        [Column(nameof(VERKSAMHETER.Aktiv))]
        public bool? Active { get; set; }

        [Column(nameof(VERKSAMHETER.VerksamhetNamn))]
        public string? BusinessName { get; set; }

        public virtual ICollection<ValidationBusiness> ValidationBusinesses { get; set; } = new HashSet<ValidationBusiness>();
    }
}
