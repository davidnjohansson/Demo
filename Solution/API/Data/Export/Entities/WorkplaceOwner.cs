using API.Attributes;
using API.Data.Import.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(ARBETSPLATSER_AGARE))]
    public class WorkplaceOwner
    {
        [Column(nameof(ARBETSPLATSER_AGARE.PK))]
        public int Id { get; set; }

        [Column(nameof(ARBETSPLATSER_AGARE.FranDag))]
        public DateTime FromDay { get; set; }

        [Column(nameof(ARBETSPLATSER_AGARE.UtfordTidpunkt))]
        public DateTime? ExecutedAt { get; set; }

        [Column(nameof(ARBETSPLATSER_AGARE.SkapadAv))]
        public string? CreatedBy { get; set; }

        [Column(nameof(ARBETSPLATSER_AGARE.SkapadTidpunkt))]
        public DateTime CreatedAt { get; set; }

        [Column(nameof(ARBETSPLATSER_AGARE.FK_ARBETSPLATSER))]
        public int WorkplaceId { get; set; }
        [Navigation(nameof(ARBETSPLATSER_AGARE.FK_ARBETSPLATSER))]
        public virtual Workplace Workplace { get; set; } = null!;

        [Column(nameof(ARBETSPLATSER_AGARE.FK_KUNDER))]
        public int CustomerId { get; set; }
        [Navigation(nameof(ARBETSPLATSER_AGARE.FK_KUNDER))]
        public virtual Customer Customer { get; set; } = null!;

        [Column(nameof(ARBETSPLATSER_AGARE.FK_ADRESSER_NY_FAKTURERING))]
        public int? NewInvoiceAddressId { get; set; }
        [Navigation(nameof(ARBETSPLATSER_AGARE.FK_ADRESSER_NY_FAKTURERING))]
        public virtual Address? NewInvoiceAddress { get; set; }

        [Column(nameof(ARBETSPLATSER_AGARE.FK_ADRESSER_GAMMAL_FAKTURERING))]
        public int? OldInvoiceAddressId { get; set; }
        [Navigation(nameof(ARBETSPLATSER_AGARE.FK_ADRESSER_GAMMAL_FAKTURERING))]
        public virtual Address? OldInvoiceAddress { get; set; }
    }
}
