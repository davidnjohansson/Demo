using API.Data.Import.Entities;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(VERKSAMHETER))]
    public class Operation : IEntity
    {
        [Column(nameof(VERKSAMHETER.PK))]
        public int Id { get; set; }

        [Column(nameof(VERKSAMHETER.Aktiv))]
        public bool? Active { get; set; }

        [Column(nameof(VERKSAMHETER.VerksamhetNamn))]
        public string? OperationName { get; set; }

        public virtual ICollection<ValidationOperation> ValidationOperations { get; set; } = new HashSet<ValidationOperation>();
    }
}
