using API.Attributes;
using API.Data.Import.Entities;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(PERSONER))]
    public class Person : IEntity
    {
        [Column(nameof(PERSONER.PK))]
        public int Id { get; set; }

        [Column(nameof(PERSONER.Personnummer))]
        public string? SocialSecurityNumber { get; set; }

        [Column(nameof(PERSONER.PersonNamn))]
        public string? PersonName { get; set; }

        [Column(nameof(PERSONER.FK_ADRESSER))]
        public int? AddressId { get; set; }
        [Navigation(nameof(PERSONER.FK_ADRESSER))]
        public virtual Address? Address { get; set; }

        public virtual ICollection<Contact> Contacts { get; set; } = new HashSet<Contact>();
    }
}
