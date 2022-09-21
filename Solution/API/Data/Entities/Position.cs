using API.Attributes;
using API.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table("POSITIONER")]
    public class Position : IEntity
    {
        [Column("PK")]
        public int Id { get; set; }

        [Column("Latitude")]
        public double Latitude { get; set; }

        [Column("Longitude")]
        public double Longitude { get; set; }

        [Navigation("ADRESSER__FK_POSITIONER")]
        public virtual ICollection<Address> Addresses { get; set; } = new HashSet<Address>();
    }
}
