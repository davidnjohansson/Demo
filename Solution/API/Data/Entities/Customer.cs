using API.Attributes;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("KUNDER")]
    public class Customer : IEntity
    {
        [Column("PK")]
        public int Id { get; set; }

        [Column("Aktiv")]
        public bool? Active { get; set; }

        [Column("KundNamn")]
        public string CustomerName { get; set; } = null!;

        [Column("KundNr")]
        public string CustomerNo { get; set; } = null!;

        [Column("FK_ADRESSER_BESOKSADRESS")]
        public int? VisitingAddressId { get; set; }
        [Navigation("_FK_ADRESSER_BESOKSADRESS")]
        public virtual Address? VisitingAddress { get; set; }

        [Column("FK_ADRESSER_FAKTURAADRESS")]
        public int? InvoiceAddressId { get; set; }
        [Navigation("_FK_ADRESSER_FAKTURAADRESS")]
        public virtual Address? InvoiceAddress { get; set; }

        [Column("FK_BETALARE")]
        public int? PayerId { get; set; }
        [Navigation("_FK_BETALARE")]
        public virtual Customer? Payer { get; set; }

        [Column("FK_ENTREPRENAD")]
        public int? ContractorId { get; set; }
        [Navigation("_FK_ENTREPRENAD")]
        public virtual Customer? Contractor { get; set; }

        [Column("FK_KONCERN")]
        public int? CorporationId { get; set; }
        [Navigation("_FK_KONCERN")]
        public virtual Customer? Corporation { get; set; }

        [Navigation("ARBETSPLATSER__FK_KUNDER")]
        public virtual ICollection<Workplace> Workplaces { get; set; } = new HashSet<Workplace>();

        [Navigation("KUNDER__FK_BETALARE")]
        public virtual ICollection<Customer> PayerFor { get; set; } = new HashSet<Customer>();

        [Navigation("KUNDER__FK_ENTREPRENAD")]
        public virtual ICollection<Customer> ContractorFor { get; set; } = new HashSet<Customer>();

        [Navigation("KUNDER__FK_KONCERN")]
        public virtual ICollection<Customer> CorporationFor { get; set; } = new HashSet<Customer>();

        public virtual ICollection<ValidationCustomer> ValidationCustomers { get; set; } = new HashSet<ValidationCustomer>();

        [Navigation("KONTAKTER__FK_KUNDER")]
        public virtual ICollection<Contact> Contacts { get; set; } = new HashSet<Contact>();

        public virtual ICollection<WorkplaceOwner> WorkplaceOwnerFor { get; set; } = new HashSet<WorkplaceOwner>();
    }
}
