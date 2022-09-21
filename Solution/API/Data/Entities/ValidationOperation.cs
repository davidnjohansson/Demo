using API.Attributes;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("VALIDERING_VERKSAMHETER")]
    public class ValidationOperation : IEntity
    {
        [Column("PK")]
        public int Id { get; set; }

        [Column("FK_VALIDERING")]
        public int ValidationId { get; set; }
        [Navigation("_FK_VALIDERING")]
        public virtual Validation Validation { get; set; } = null!;

        [Column("FK_VERKSAMHETER")]
        public int OperationId { get; set; }
        [Navigation("_FK_VERKSAMHETER")]
        public virtual Operation Operation { get; set; } = null!;
    }
}
