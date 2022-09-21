using API.Attributes;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("VALIDERING_GRUPP")]
    public class ValidationGroup : IEntity
    {
        [Column("PK")]
        public int Id { get; set; }

        [Column("GruppNamn")]
        public string GroupName { get; set; } = null!;

        [Navigation("VALIDERING_GRUPP__FK_GRUPP")]
        public virtual ICollection<Validation> Validations { get; set; } = new HashSet<Validation>();
    }
}
