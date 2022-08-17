﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace API.Data.Import.Entities
{
    public partial class KUNDER
    {
        public KUNDER()
        {
            ARBETSPLATSER = new HashSet<ARBETSPLATSER>();
            InverseFK_BETALARENavigation = new HashSet<KUNDER>();
            InverseFK_ENTREPRENADNavigation = new HashSet<KUNDER>();
            InverseFK_KONCERNNavigation = new HashSet<KUNDER>();
            VALIDERING_KUNDER = new HashSet<VALIDERING_KUNDER>();
        }

        public int PK { get; set; }
        public bool? Aktiv { get; set; }
        public int FK_KUNDKATEGORIER { get; set; }
        public int? FK_BILDER { get; set; }
        public int? FK_BETALVILLKOR { get; set; }
        public int FK_LANDER_MOMS { get; set; }
        public int? FK_BETALARE { get; set; }
        public int? FK_LINJER { get; set; }
        public int FK_VALUTOR { get; set; }
        public int? FK_SCHEMA_FAKTURERING { get; set; }
        public int? FK_OMVAND_SKATT { get; set; }
        public int? FK_ENTREPRENAD { get; set; }
        public int? FK_FAKTURERINGSAVGIFTER { get; set; }
        public string KundNr { get; set; } = null!;
        public string KundNamn { get; set; } = null!;
        public int? FK_ADRESSER_FAKTURAADRESS { get; set; }
        public int? FK_ADRESSER_BESOKSADRESS { get; set; }
        public int? FK_FAKTURAKOER { get; set; }
        public int? FK_KONTO_BONUS_INTAKT { get; set; }
        public int? FK_KONTO_BONUS_BALANS { get; set; }
        public int? FK_MOMSKOD_BONUS { get; set; }
        public int? FK_MELLANSKILLNADSMALL { get; set; }
        public int? FK_COUNTERS_MALL { get; set; }
        public int? FK_KONCERN { get; set; }
        public int? FK_SPRAK { get; set; }
        public int? FK_KUNDBOKFORINGSMALL { get; set; }
        public int? FK_KUNDGRUPPER { get; set; }
        public int? FK_ATTESTFLODE { get; set; }
        public int? FK_BOLAG_Internkund { get; set; }
        public int? FK_ANVANDARE { get; set; }
        public int? FK_FAKTURAKOER_AVRAKNING { get; set; }
        public int? FK_EWCGrupp { get; set; }
        public int? FK_ENTREPRENADER { get; set; }
        public int? FK_MinimumDebiteringsArtikel { get; set; }
        public int? FK_MOMSLANDKOD { get; set; }
        public int? FK_ARTIKELDIALEKT { get; set; }
        public int? FK_ANVANDARE_KONTAKT { get; set; }
        public int? FK_KREDITFORSAKRATBELOPP_VALUTA { get; set; }
        public int? FK_EDIJOBB_AVISERING { get; set; }
        public int? FK_EDIJOBB_SMS { get; set; }
        public int? FK_BETALVILLKOR_SJALVFAKTURA { get; set; }

        public virtual ADRESSER? FK_ADRESSER_BESOKSADRESSNavigation { get; set; }
        public virtual ADRESSER? FK_ADRESSER_FAKTURAADRESSNavigation { get; set; }
        public virtual KUNDER? FK_BETALARENavigation { get; set; }
        public virtual KUNDER? FK_ENTREPRENADNavigation { get; set; }
        public virtual KUNDER? FK_KONCERNNavigation { get; set; }
        public virtual ICollection<ARBETSPLATSER> ARBETSPLATSER { get; set; }
        public virtual ICollection<KUNDER> InverseFK_BETALARENavigation { get; set; }
        public virtual ICollection<KUNDER> InverseFK_ENTREPRENADNavigation { get; set; }
        public virtual ICollection<KUNDER> InverseFK_KONCERNNavigation { get; set; }
        public virtual ICollection<VALIDERING_KUNDER> VALIDERING_KUNDER { get; set; }
    }
}