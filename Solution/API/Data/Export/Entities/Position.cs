using API.Data.Import.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Data.Export.Entities
{
    [Table(nameof(POSITIONER))]
    public class Position
    {
        [Column(nameof(POSITIONER.PK))]
        public int Id { get; set; }

        [Column(nameof(POSITIONER.Latitude))]
        public double Latitude { get; set; }

        [Column(nameof(POSITIONER.Longitude))]
        public double Longitude { get; set; }

        public virtual ICollection<Address> Addresses { get; set; } = new HashSet<Address>();

        public virtual ICollection<Workplace> Workplaces { get; set; } = new HashSet<Workplace>();
    }
}
