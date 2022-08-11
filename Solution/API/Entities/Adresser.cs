﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace API.Entities
{
    public partial class Adresser
    {
        public Adresser()
        {
            Arbetsplatser = new HashSet<Arbetsplatser>();
            KunderFkAdresserBesoksadressNavigation = new HashSet<Kunder>();
            KunderFkAdresserFakturaadressNavigation = new HashSet<Kunder>();
        }

        public int Pk { get; set; }
        public bool? Aktiv { get; set; }
        public int FkAdresstyp { get; set; }
        public int? FkPositioner { get; set; }
        public int? FkLander { get; set; }
        public string? Namn { get; set; }
        public string? Co { get; set; }
        public string? Adress1 { get; set; }
        public string? Adress2 { get; set; }
        public string? Zon { get; set; }
        public string? Postnr { get; set; }
        public string? Ort { get; set; }
        public string? Kontakt { get; set; }
        public string? Epost { get; set; }
        public string? Telefon1 { get; set; }
        public string? Telefon2 { get; set; }
        public string? Telefon3 { get; set; }
        public string? Mobiltelefon { get; set; }
        public string? Fax { get; set; }
        public string? Vagbeskrivning { get; set; }
        public string? Referens { get; set; }
        public string? Id { get; set; }
        public int? FkZon { get; set; }
        public string? Lastinfo { get; set; }
        public string? Lossinfo { get; set; }
        public string? PallregNummer { get; set; }
        public DateTime? Slottid { get; set; }
        public string? InternInformation { get; set; }
        public string? KommunKod { get; set; }
        public string? LagerStalleNr { get; set; }
        public DateTime? SlottidSlut { get; set; }
        public string? SiloId { get; set; }
        public string? Framkomlighet { get; set; }
        public string? CfarNr { get; set; }

        public virtual Adresstyp FkAdresstypNavigation { get; set; } = null!;
        public virtual Positioner? FkPositionerNavigation { get; set; }
        public virtual ICollection<Arbetsplatser> Arbetsplatser { get; set; }
        public virtual ICollection<Kunder> KunderFkAdresserBesoksadressNavigation { get; set; }
        public virtual ICollection<Kunder> KunderFkAdresserFakturaadressNavigation { get; set; }
    }
}