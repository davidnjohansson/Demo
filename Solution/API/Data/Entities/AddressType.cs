using API.Data.Import.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Entities
{
    [Table(nameof(ADRESSTYP))]
    public class AddressType
    {
        [Column(nameof(ADRESSTYP.PK))]
        public int Id { get; set; }

        [Column(nameof(ADRESSTYP.AdresstypNamn))]
        public string AddressTypeName { get; set; } = null!;

        public virtual ICollection<Address> Addresses { get; set; } = new HashSet<Address>();
    }
}
