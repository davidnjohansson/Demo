using API.Data.Import.Entities;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(VALIDERING_GRUPP))]
    public class ValidationGroup : IEntity
    {
        [Column(nameof(VALIDERING_GRUPP.PK))]
        public int Id { get; set; }

        [Column(nameof(VALIDERING_GRUPP.GruppNamn))]
        public string GroupName { get; set; } = null!;

        public virtual ICollection<Validation> Validations { get; set; } = new HashSet<Validation>();
    }
}
