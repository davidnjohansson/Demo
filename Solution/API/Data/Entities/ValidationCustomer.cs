using API.Attributes;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("VALIDERING_KUNDER")]
    public class ValidationCustomer : IEntity
    {
        [Column("PK")]
        public int Id { get; set; }

        [Column("FK_VALIDERING")]
        public int ValidationId { get; set; }
        [Navigation("_FK_VALIDERING")]
        public virtual Validation Validation { get; set; } = null!;

        [Column("FK_KUNDER")]
        public int CustomerId { get; set; }
        [Navigation("_FK_KUNDER")]
        public virtual Customer Customer { get; set; } = null!;
    }
}
