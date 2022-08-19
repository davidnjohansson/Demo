using API.Attributes;
using API.Data.Import.Entities;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(VALIDERING_VERKSAMHETER))]
    public class ValidationOperation : IEntity
    {
        [Column(nameof(VALIDERING_VERKSAMHETER.PK))]
        public int Id { get; set; }

        [Column(nameof(VALIDERING_VERKSAMHETER.FK_VALIDERING))]
        public int ValidationId { get; set; }
        [Property(nameof(VALIDERING_VERKSAMHETER.FK_VALIDERING))]
        public virtual Validation Validation { get; set; } = null!;

        [Column(nameof(VALIDERING_VERKSAMHETER.FK_VERKSAMHETER))]
        public int OperationId { get; set; }
        [Property(nameof(VALIDERING_VERKSAMHETER.FK_VERKSAMHETER))]
        public virtual Operation Operation { get; set; } = null!;
    }
}
