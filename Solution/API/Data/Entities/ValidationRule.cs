using API.Attributes;
using API.Enums;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("VALIDERING_REGEL")]
    public class ValidationRule : IEntity
    {
        [Column("PK")]
        public int Id { get; set; }

        [Column("EntitetsNamn")]
        public string EntityName { get; set; } = null!;

        [Column("PropertyNamn")]
        public string PropertyName { get; set; } = null!;

        [Column("FK_EnumOperation")]
        public int EnumOperationId { get; set; }

        [NotMapped]
        public EnumValidationOperation EnumOperation 
        { 
            get => (EnumValidationOperation)EnumOperationId;
            set => EnumOperationId = (int)value;
        }

        [Column("Felmeddelande")]
        public string? ErrorMessage { get; set; }

        [Column("VardeNumeriskt")]
        public double? ValueNumeric { get; set; }

        [Column("VardeAlfanumeriskt")]
        public string? ValueAlphanumeric { get; set; }

        [Column("VardeDatum")]
        public DateTime? ValueDateTime { get; set; }

        [Column("VardeBoolean")]
        public bool? ValueBoolean { get; set; }

        [Column("FK_Entitet")]
        public int? ValueForeignKey { get; set; }

        [Column("RegexPattern")]
        public string? RegexPattern { get; set; }

        [Column("AllowNull")]
        public bool AllowNull { get; set; }

        [Column("FK_REGEL")]
        public int? InverseValidationRuleId { get; set; }
        [Navigation("_FK_REGEL")]
        public virtual ValidationRule? InverseValidationRule { get; set; }

        [Column("FK_VALIDERING")]
        public int ValidationId { get; set; }
        [Navigation("_FK_VALIDERING")]
        public virtual Validation Validation { get; set; } = null!;

        [Navigation("VALIDERING_REGEL__FK_REGEL")]
        public virtual ICollection<ValidationRule> InverseValidationRules { get; set; } = new HashSet<ValidationRule>();
    }
}
