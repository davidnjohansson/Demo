// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace API.Data.Import.Entities
{
    public partial class POSITIONER
    {
        public POSITIONER()
        {
            ADRESSER = new HashSet<ADRESSER>();
            ARBETSPLATSER = new HashSet<ARBETSPLATSER>();
        }

        public int PK { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public virtual ICollection<ADRESSER> ADRESSER { get; set; }
        public virtual ICollection<ARBETSPLATSER> ARBETSPLATSER { get; set; }
    }
}