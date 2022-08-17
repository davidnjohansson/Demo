using API.Data.Import.Entities;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(ADRESSTYP))]
    public class AddressType : IEntity
    {
        [Column(nameof(ADRESSTYP.PK))]
        public int Id { get; set; }

        [Column(nameof(ADRESSTYP.AdresstypNamn))]
        public string? AddressTypeName { get; set; } = null!;

        public virtual ICollection<Address> Addresses { get; set; } = new HashSet<Address>();
    }
}
