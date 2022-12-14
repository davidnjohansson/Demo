// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace API.Data.Import.Entities
{
    public partial class VALIDERING
    {
        public VALIDERING()
        {
            VALIDERING_KUNDER = new HashSet<VALIDERING_KUNDER>();
            VALIDERING_REGEL = new HashSet<VALIDERING_REGEL>();
            VALIDERING_VERKSAMHETER = new HashSet<VALIDERING_VERKSAMHETER>();
        }

        public int PK { get; set; }
        public string Namn { get; set; } = null!;
        public int? FK_EnumValideringsSteg { get; set; }
        public int? FK_GRUPP { get; set; }
        public bool Aktiv { get; set; }
        public bool Generell { get; set; }
        public bool EndastVarning { get; set; }

        public virtual VALIDERING_GRUPP? FK_GRUPPNavigation { get; set; }
        public virtual ICollection<VALIDERING_KUNDER> VALIDERING_KUNDER { get; set; }
        public virtual ICollection<VALIDERING_REGEL> VALIDERING_REGEL { get; set; }
        public virtual ICollection<VALIDERING_VERKSAMHETER> VALIDERING_VERKSAMHETER { get; set; }
    }
}