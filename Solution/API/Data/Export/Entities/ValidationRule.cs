using API.Data.Import.Entities;
using API.Enums;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(VALIDERING_REGEL))]
    public class ValidationRule : IEntity
    {
        [Column(nameof(VALIDERING_REGEL.PK))]
        public int Id { get; set; }

        [Column(nameof(VALIDERING_REGEL.EntitetsNamn))]
        public string EntityName { get; set; } = null!;

        [Column(nameof(VALIDERING_REGEL.PropertyNamn))]
        public string PropertyName { get; set; } = null!;

        [Column(nameof(VALIDERING_REGEL.FK_EnumOperation))]
        public int EnumOperationId { get; set; }

        [NotMapped]
        public EnumValidationOperation EnumOperation 
        { 
            get => (EnumValidationOperation)EnumOperationId;
            set => EnumOperationId = (int)value;
        }

        [Column(nameof(VALIDERING_REGEL.Felmeddelande))]
        public string? ErrorMessage { get; set; }

        [Column(nameof(VALIDERING_REGEL.VardeNumeriskt))]
        public double? ValueNumeric { get; set; }

        [Column(nameof(VALIDERING_REGEL.VardeAlfanumeriskt))]
        public string? ValueAlphanumeric { get; set; }

        [Column(nameof(VALIDERING_REGEL.VardeDatum))]
        public DateTime? ValueDateTime { get; set; }

        [Column(nameof(VALIDERING_REGEL.VardeBoolean))]
        public bool? ValueBoolean { get; set; }

        [Column(nameof(VALIDERING_REGEL.FK_Entitet))]
        public int? ValueForeignKey { get; set; }

        [Column(nameof(VALIDERING_REGEL.RegexPattern))]
        public string? RegexPattern { get; set; }

        [Column(nameof(VALIDERING_REGEL.AllowNull))]
        public bool AllowNull { get; set; }

        [Column(nameof(VALIDERING_REGEL.FK_REGEL))]
        public int? InverseValidationRuleId { get; set; }
        public virtual ValidationRule? InverseValidationRule { get; set; }

        [Column(nameof(VALIDERING_REGEL.FK_VALIDERING))]
        public int ValidationId { get; set; }
        public virtual Validation Validation { get; set; } = null!;

        public virtual ICollection<ValidationRule> InverseValidationRules { get; set; } = new HashSet<ValidationRule>();
    }
}
