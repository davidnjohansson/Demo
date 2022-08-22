using API.Attributes;
using API.Data.Import.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(KONTAKTER_ARBETSPLATSER))]
    public class ContactWorkplace
    {
        [Column(nameof(KONTAKTER_ARBETSPLATSER.FK_KONTAKTER))]
        public int ContactId { get; set; }
        [Navigation(nameof(KONTAKTER_ARBETSPLATSER.FK_KONTAKTER))]
        public virtual Contact Contact { get; set; } = null!;

        [Column(nameof(KONTAKTER_ARBETSPLATSER.FK_ARBETSPLATSER))]
        public int WorkplaceId { get; set; }
        [Navigation(nameof(KONTAKTER_ARBETSPLATSER.FK_ARBETSPLATSER))]
        public virtual Workplace Workplace { get; set; } = null!;
    }
}
