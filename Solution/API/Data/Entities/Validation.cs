using API.Attributes;
using API.Enums;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("VALIDERING")]
    public class Validation : IEntity
    {
        [Column("PK")]
        public int Id { get; set; }

        [Column("Namn")]
        public string Name { get; set; } = null!;

        [Column("Aktiv")]
        public bool Active { get; set; }

        [Column("Generell")]
        public bool General { get; set; }

        [Column("EndastVarning")]
        public bool OnlyWarning { get; set; }

        [Column("FK_EnumValideringsSteg")]
        public int? EnumValidationStepId { get; set; }

        [NotMapped]
        public EnumValidationStep EnumValidationStep
        {
            get => (EnumValidationStep)EnumValidationStepId.GetValueOrDefault();
            set => EnumValidationStepId = (int)value;
        }

        [Column("FK_GRUPP")]
        public int? ValidationGroupId { get; set; }
        [Navigation("_FK_GRUPP")]
        public virtual ValidationGroup? ValidationGroup { get; set; }

        [Navigation("VALIDERING_KUNDER__FK_VALIDERING")]
        public virtual ICollection<ValidationCustomer> ValidationCustomers { get; set; } = new HashSet<ValidationCustomer>();

        [Navigation("VALIDERING_REGEL__FK_VALIDERING")]
        public virtual ICollection<ValidationRule> ValidationRules { get; set; } = new HashSet<ValidationRule>();

        [Navigation("VALIDERING_VERKSAMHETER__FK_VALIDERING")]
        public virtual ICollection<ValidationOperation> ValidationOperations { get; set; } = new HashSet<ValidationOperation>();
    }
}
