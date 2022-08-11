﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace API.Entities
{
    public partial class Arbetsplatser
    {
        public int Pk { get; set; }
        public bool? Aktiv { get; set; }
        public int FkKunder { get; set; }
        public int FkAdresser { get; set; }
        public int? FkPositioner { get; set; }
        public string ArbetsplatsNamn { get; set; } = null!;
        public TimeSpan? Oppnar { get; set; }
        public TimeSpan? Stanger { get; set; }
        public TimeSpan? LunchStart { get; set; }
        public TimeSpan? LunchStopp { get; set; }
        public string? Nyckelkod { get; set; }
        public string? Kartkod { get; set; }
        public string? SekundarKund { get; set; }
        public string? Referens1 { get; set; }
        public string? Referens2 { get; set; }
        public string? Referens3 { get; set; }
        public string? Referens4 { get; set; }
        public string? Referens5 { get; set; }
        public bool StandardApl { get; set; }
        public string? Fastighetsbeteckning { get; set; }
        public string? Anläggningsnummer { get; set; }
        public int? FkKontakt { get; set; }
        public int? FkEwcgrupp { get; set; }
        public int? FkKundgrupper { get; set; }
        public int? FkLinjer { get; set; }
        public int? DebiteringsgrundandeAntal { get; set; }
        public byte[] RowVersion { get; set; } = null!;

        public virtual Adresser FkAdresserNavigation { get; set; } = null!;
        public virtual Kunder FkKunderNavigation { get; set; } = null!;
        public virtual Positioner? FkPositionerNavigation { get; set; }
    }
}