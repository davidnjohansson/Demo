using API.Attributes;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("ADRESSER")]
    public class Address : IEntity
    {
        [Column("PK")]
        public int Id { get; set; }

        [Column("Aktiv")]
        public bool? Active { get; set; }

        [Column("Adress1")]
        public string? Address1 { get; set; }

        [Column("Ort")]
        public string? City { get; set; }

        [Column("Postnr")]
        public string? ZipCode { get; set; }

        [Column("FK_ADRESSTYP")]
        public int AddressTypeId { get; set; }
        [Navigation("_FK_ADRESSTYP")]
        public virtual AddressType AddressType { get; set; } = null!;

        [Column("FK_POSITIONER")]
        public int? PositionId { get; set; }
        [Navigation("_FK_POSITIONER")]
        public virtual Position? Position { get; set; }

        [Navigation("ARBETSPLATSER__FK_ADRESSER")]
        public virtual ICollection<Workplace> Workplaces { get; set; } = new HashSet<Workplace>();

        [Navigation("KUNDER__FK_ADRESSER_BESOKSADRESS")]
        public virtual ICollection<Customer> VisitingAddressFor { get; set; } = new HashSet<Customer>();

        [Navigation("KUNDER__FK_ADRESSER_FAKTURAADRESS")]
        public virtual ICollection<Customer> InvoiceAddressFor { get; set; } = new HashSet<Customer>();

        [Navigation("PERSONER__FK_ADRESSER")]
        public virtual ICollection<Person> Persons { get; set; } = new HashSet<Person>();
    }
}
