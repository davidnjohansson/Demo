using API.Attributes;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("KONTAKTER_ARBETSPLATSER")]
    public class ContactWorkplace
    {
        [Column("FK_KONTAKTER")]
        public int ContactId { get; set; }
        [Navigation("_FK_KONTAKTER")]
        public virtual Contact Contact { get; set; } = null!;

        [Column("FK_ARBETSPLATSER")]
        public int WorkplaceId { get; set; }
        [Navigation("_FK_ARBETSPLATSER")]
        public virtual Workplace Workplace { get; set; } = null!;
    }
}
