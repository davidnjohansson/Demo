using API.Attributes;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("PERSONER")]
    public class Person : IEntity
    {
        [Column("PK")]
        public int Id { get; set; }

        [Column("Personnummer")]
        public string? SocialSecurityNumber { get; set; }

        [Column("PersonNamn")]
        public string? PersonName { get; set; }

        [Column("FK_ADRESSER")]
        public int? AddressId { get; set; }
        [Navigation("_FK_ADRESSER")]
        public virtual Address? Address { get; set; }

        [Navigation("KONTAKTER__FK_PERSONER")]
        public virtual ICollection<Contact> Contacts { get; set; } = new HashSet<Contact>();
    }
}
