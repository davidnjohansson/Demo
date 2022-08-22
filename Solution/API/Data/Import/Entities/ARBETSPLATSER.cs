﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace API.Data.Import.Entities
{
    public partial class ARBETSPLATSER
    {
        public ARBETSPLATSER()
        {
            KONTAKTER_ARBETSPLATSER = new HashSet<KONTAKTER_ARBETSPLATSER>();
        }

        public int PK { get; set; }
        public bool? Aktiv { get; set; }
        public int FK_KUNDER { get; set; }
        public int FK_ADRESSER { get; set; }
        public int? FK_POSITIONER { get; set; }
        public string ArbetsplatsNamn { get; set; } = null!;
        public int? FK_KONTAKT { get; set; }
        public int? FK_EWCGrupp { get; set; }
        public int? FK_KUNDGRUPPER { get; set; }

        public virtual ADRESSER FK_ADRESSERNavigation { get; set; } = null!;
        public virtual KONTAKTER? FK_KONTAKTNavigation { get; set; }
        public virtual KUNDER FK_KUNDERNavigation { get; set; } = null!;
        public virtual POSITIONER? FK_POSITIONERNavigation { get; set; }
        public virtual ICollection<KONTAKTER_ARBETSPLATSER> KONTAKTER_ARBETSPLATSER { get; set; }
    }
}