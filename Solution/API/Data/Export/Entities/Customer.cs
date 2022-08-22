using API.Attributes;
using API.Data.Import.Entities;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(KUNDER))]
    public class Customer : IEntity
    {
        [Column(nameof(KUNDER.PK))]
        public int Id { get; set; }

        [Column(nameof(KUNDER.Aktiv))]
        public bool? Active { get; set; }

        [Column(nameof(KUNDER.KundNamn))]
        public string CustomerName { get; set; } = null!;

        [Column(nameof(KUNDER.KundNr))]
        public string CustomerNo { get; set; } = null!;

        [Column(nameof(KUNDER.FK_ADRESSER_BESOKSADRESS))]
        public int? VisitingAddressId { get; set; }
        [Property(nameof(KUNDER.FK_ADRESSER_BESOKSADRESS))]
        public virtual Address? VisitingAddress { get; set; }

        [Column(nameof(KUNDER.FK_ADRESSER_FAKTURAADRESS))]
        public int? InvoiceAddressId { get; set; }
        [Property(nameof(KUNDER.FK_ADRESSER_FAKTURAADRESS))]
        public virtual Address? InvoiceAddress { get; set; }

        [Column(nameof(KUNDER.FK_BETALARE))]
        public int? PayerId { get; set; }
        [Property(nameof(KUNDER.FK_BETALARE))]
        public virtual Customer? Payer { get; set; }

        [Column(nameof(KUNDER.FK_ENTREPRENAD))]
        public int? ContractorId { get; set; }
        [Property(nameof(KUNDER.FK_ENTREPRENAD))]
        public virtual Customer? Contractor { get; set; }

        [Column(nameof(KUNDER.FK_KONCERN))]
        public int? CorporationId { get; set; }
        [Property(nameof(KUNDER.FK_KONCERN))]
        public virtual Customer? Corporation { get; set; }

        public virtual ICollection<Workplace> Workplaces { get; set; } = new HashSet<Workplace>();

        public virtual ICollection<Customer> PayerFor { get; set; } = new HashSet<Customer>();

        public virtual ICollection<Customer> ContractorFor { get; set; } = new HashSet<Customer>();

        public virtual ICollection<Customer> CorporationFor { get; set; } = new HashSet<Customer>();

        public virtual ICollection<ValidationCustomer> ValidationCustomers { get; set; } = new HashSet<ValidationCustomer>();

        public virtual ICollection<Contact> Contacts { get; set; } = new HashSet<Contact>();
    }
}
