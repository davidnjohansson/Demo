using API.Attributes;
using API.Data.Import.Entities;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(VALIDERING_KUNDER))]
    public class ValidationCustomer : IEntity
    {
        [Column(nameof(VALIDERING_KUNDER.PK))]
        public int Id { get; set; }

        [Column(nameof(VALIDERING_KUNDER.FK_VALIDERING))]
        public int ValidationId { get; set; }
        [Navigation(nameof(VALIDERING_KUNDER.FK_VALIDERING))]
        public virtual Validation Validation { get; set; } = null!;

        [Column(nameof(VALIDERING_KUNDER.FK_KUNDER))]
        public int CustomerId { get; set; }
        [Navigation(nameof(VALIDERING_KUNDER.FK_KUNDER))]
        public virtual Customer Customer { get; set; } = null!;
    }
}
