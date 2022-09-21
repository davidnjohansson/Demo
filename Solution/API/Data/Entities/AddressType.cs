using API.Attributes;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("ADRESSTYP")]
    public class AddressType : IEntity
    {
        [Column("PK")]
        public int Id { get; set; }

        [Column("AdresstypNamn")]
        public string? AddressTypeName { get; set; } = null!;

        [Navigation("ADRESSER__FK_ADRESSTYP")]
        public virtual ICollection<Address> Addresses { get; set; } = new HashSet<Address>();
    }
}
