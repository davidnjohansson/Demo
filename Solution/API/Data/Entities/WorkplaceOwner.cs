using API.Attributes;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("ARBETSPLATSER_AGARE")]
    public class WorkplaceOwner
    {
        [Column("PK")]
        public int Id { get; set; }

        [Column("FranDag")]
        public DateTime FromDay { get; set; }

        [Column("UtfordTidpunkt")]
        public DateTime? ExecutedAt { get; set; }

        [Column("SkapadAv")]
        public string? CreatedBy { get; set; }

        [Column("SkapadTidpunkt")]
        public DateTime CreatedAt { get; set; }

        [Column("FK_ARBETSPLATSER")]
        public int WorkplaceId { get; set; }
        [Navigation("_FK_ARBETSPLATSER")]
        public virtual Workplace Workplace { get; set; } = null!;

        [Column("FK_KUNDER")]
        public int CustomerId { get; set; }
        [Navigation("_FK_KUNDER")]
        public virtual Customer Customer { get; set; } = null!;
    }
}
