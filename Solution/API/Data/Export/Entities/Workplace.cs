using API.Data.Import.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(ARBETSPLATSER))]
    public class Workplace
    {
        [Column(nameof(ARBETSPLATSER.PK))]
        public int Id { get; set; }

        [Column(nameof(ARBETSPLATSER.Aktiv))]
        public bool Active { get; set; }

        [Column(nameof(ARBETSPLATSER.ArbetsplatsNamn))]
        public string WorkplaceName { get; set; } = null!;

        [Column(nameof(ARBETSPLATSER.FK_ADRESSER))]
        public int AddressId { get; set; }
        public virtual Address Address { get; set; } = null!;

        [Column(nameof(ARBETSPLATSER.FK_KUNDER))]
        public int CustomerId { get; set; }
        public virtual Customer Customer { get; set; } = null!;
    }
}
