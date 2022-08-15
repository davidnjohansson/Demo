using API.Data.Import.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(ADRESSER))]
    public class Address
    {
        [Column(nameof(ADRESSER.PK))]
        public int Id { get; set; }

        [Column(nameof(ADRESSER.Aktiv))]
        public bool Active { get; set; }

        [Column(nameof(ADRESSER.Adress1))]
        public string? Address1 { get; set; }

        [Column(nameof(ADRESSER.Ort))]
        public string? City { get; set; }

        [Column(nameof(ADRESSER.Postnr))]
        public string? ZipCode { get; set; }

        [Column(nameof(ADRESSER.FK_ADRESSTYP))]
        public int AddressTypeId { get; set; }
        public virtual AddressType AddressType { get; set; } = null!;

        [Column(nameof(ADRESSER.FK_POSITIONER))]
        public int? PositionId { get; set; }
        public virtual Position? Position { get; set; }

        public virtual ICollection<Workplace> Workplaces { get; set; } = new HashSet<Workplace>();

        public virtual ICollection<Customer> VisitingAddressFor { get; set; } = new HashSet<Customer>();

        public virtual ICollection<Customer> InvoiceAddressFor { get; set; } = new HashSet<Customer>();
    }
}
