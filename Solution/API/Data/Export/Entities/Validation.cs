using API.Attributes;
using API.Data.Import.Entities;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(VALIDERING))]
    public class Validation : IEntity
    {
        [Column(nameof(VALIDERING.PK))]
        public int Id { get; set; }

        [Column(nameof(VALIDERING.Namn))]
        public string Name { get; set; } = null!;

        [Column(nameof(VALIDERING.Aktiv))]
        public bool Active { get; set; }

        [Column(nameof(VALIDERING.Generell))]
        public bool General { get; set; }

        [Column(nameof(VALIDERING.EndastVarning))]
        public bool OnlyWarning { get; set; }

        //public int? FK_EnumValideringsSteg { get; set; } // Hur hanterar vi Enum?

        [Column(nameof(VALIDERING.FK_GRUPP))]
        public int? ValidationGroupId { get; set; }
        [Navigation(nameof(VALIDERING.FK_GRUPP))]
        public virtual ValidationGroup? ValidationGroup { get; set; }

        public virtual ICollection<ValidationCustomer> ValidationCustomers { get; set; } = new HashSet<ValidationCustomer>();

        public virtual ICollection<ValidationRule> ValidationRules { get; set; } = new HashSet<ValidationRule>();

        public virtual ICollection<ValidationOperation> ValidationOperations { get; set; } = new HashSet<ValidationOperation>();
    }
}
