﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using API.Entities;

namespace API.Data
{
    public partial class T6DbContext : DbContext
    {
        public T6DbContext(DbContextOptions<T6DbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Adresser> Adresser { get; set; } = null!;
        public virtual DbSet<Adresstyp> Adresstyp { get; set; } = null!;
        public virtual DbSet<Arbetsplatser> Arbetsplatser { get; set; } = null!;
        public virtual DbSet<Kunder> Kunder { get; set; } = null!;
        public virtual DbSet<Positioner> Positioner { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("Finnish_Swedish_CI_AS");

            modelBuilder.Entity<Adresser>(entity =>
            {
                entity.HasKey(e => e.Pk);

                entity.ToTable("ADRESSER");

                entity.Property(e => e.Pk).HasColumnName("PK");

                entity.Property(e => e.Adress1)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Adress2)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Aktiv).HasDefaultValueSql("((1))");

                entity.Property(e => e.CfarNr)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Co)
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasColumnName("CO");

                entity.Property(e => e.Epost)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Fax)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.FkAdresstyp).HasColumnName("FK_ADRESSTYP");

                entity.Property(e => e.FkLander).HasColumnName("FK_LANDER");

                entity.Property(e => e.FkPositioner).HasColumnName("FK_POSITIONER");

                entity.Property(e => e.FkZon).HasColumnName("FK_ZON");

                entity.Property(e => e.Framkomlighet)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Id)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.InternInformation)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.KommunKod)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Kontakt)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.LagerStalleNr)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Lastinfo)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Lossinfo)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Mobiltelefon)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Namn)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Ort)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.PallregNummer)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Postnr)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Referens)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.SiloId)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Slottid).HasColumnType("datetime");

                entity.Property(e => e.SlottidSlut).HasColumnType("datetime");

                entity.Property(e => e.Telefon1)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Telefon2)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Telefon3)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Vagbeskrivning)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Zon)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.HasOne(d => d.FkAdresstypNavigation)
                    .WithMany(p => p.Adresser)
                    .HasForeignKey(d => d.FkAdresstyp)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ADRESSER_ADRESSTYP");

                entity.HasOne(d => d.FkPositionerNavigation)
                    .WithMany(p => p.Adresser)
                    .HasForeignKey(d => d.FkPositioner)
                    .HasConstraintName("FK_ADRESSER_POSITIONER");
            });

            modelBuilder.Entity<Adresstyp>(entity =>
            {
                entity.HasKey(e => e.Pk);

                entity.ToTable("ADRESSTYP");

                entity.Property(e => e.Pk).HasColumnName("PK");

                entity.Property(e => e.AdresstypNamn)
                    .HasMaxLength(8000)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Arbetsplatser>(entity =>
            {
                entity.HasKey(e => e.Pk);

                entity.ToTable("ARBETSPLATSER");

                entity.HasIndex(e => e.FkKunder, "_dta_index_ARBETSPLATSER_5_773577794__K3_1_2_4_5_6_7_8_9_10_11_12_13_14_15_16_17_18_19_20_21_22_4364");

                entity.Property(e => e.Pk).HasColumnName("PK");

                entity.Property(e => e.Aktiv)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Anläggningsnummer)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.ArbetsplatsNamn)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Fastighetsbeteckning)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.FkAdresser).HasColumnName("FK_ADRESSER");

                entity.Property(e => e.FkEwcgrupp).HasColumnName("FK_EWCGrupp");

                entity.Property(e => e.FkKontakt).HasColumnName("FK_KONTAKT");

                entity.Property(e => e.FkKunder).HasColumnName("FK_KUNDER");

                entity.Property(e => e.FkKundgrupper).HasColumnName("FK_KUNDGRUPPER");

                entity.Property(e => e.FkLinjer).HasColumnName("FK_LINJER");

                entity.Property(e => e.FkPositioner).HasColumnName("FK_POSITIONER");

                entity.Property(e => e.Kartkod)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Nyckelkod)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Referens1)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Referens2)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Referens3)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Referens4)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Referens5)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.RowVersion)
                    .IsRowVersion()
                    .IsConcurrencyToken();

                entity.Property(e => e.SekundarKund)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.HasOne(d => d.FkAdresserNavigation)
                    .WithMany(p => p.Arbetsplatser)
                    .HasForeignKey(d => d.FkAdresser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ARBETSPLATSER_ADRESSER");

                entity.HasOne(d => d.FkKunderNavigation)
                    .WithMany(p => p.Arbetsplatser)
                    .HasForeignKey(d => d.FkKunder)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ARBETSPLATSER_KUNDER");

                entity.HasOne(d => d.FkPositionerNavigation)
                    .WithMany(p => p.Arbetsplatser)
                    .HasForeignKey(d => d.FkPositioner)
                    .HasConstraintName("FK_ARBETSPLATSER_POSITIONER");
            });

            modelBuilder.Entity<Kunder>(entity =>
            {
                entity.HasKey(e => e.Pk);

                entity.ToTable("KUNDER");

                entity.HasIndex(e => e.Pk, "_dta_index_KUNDER_5_958626458__K1_8066");

                entity.HasIndex(e => new { e.Mall, e.Aktiv, e.Kund, e.Abonnent }, "_dta_index_KUNDER_5_958626458__K59_K2_K14_K17_1_3_4_5_6_7_8_9_10_11_12_13_15_16_18_19_20_21_22_23_24_25_26_27_28_29_30_31_32_");

                entity.Property(e => e.Pk).HasColumnName("PK");

                entity.Property(e => e.AbonnentNr)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Aktiv)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.AndradAnvandare)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.AndradTidpunkt).HasColumnType("datetime");

                entity.Property(e => e.BankClearing)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.BankKonto)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Bankgiro)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Banknamn)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.BetalmetodExternkod)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.BomkorningAction).HasDefaultValueSql("((0))");

                entity.Property(e => e.BomkorningEmailAdresser)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.BomkorningTillaten).HasDefaultValueSql("((0))");

                entity.Property(e => e.Bransch)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.DbcalcHarFilkrav).HasColumnName("DBCalc_HarFilkrav");

                entity.Property(e => e.Dimensionsbeskrivning)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Dimensionskod)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.EdiId)
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasColumnName("EdiID");

                entity.Property(e => e.EnumRapporteringstypNvv).HasColumnName("EnumRapporteringstypNVV");

                entity.Property(e => e.EpostNvvbekraftelse)
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasColumnName("EpostNVVBekraftelse");

                entity.Property(e => e.EpostPaminnelse)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.ExternalId)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.ExternkodMallKund)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.ExternkodMallLev)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.FakturaReferens)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.FkAdresserBesoksadress).HasColumnName("FK_ADRESSER_BESOKSADRESS");

                entity.Property(e => e.FkAdresserFakturaadress).HasColumnName("FK_ADRESSER_FAKTURAADRESS");

                entity.Property(e => e.FkAnvandare).HasColumnName("FK_ANVANDARE");

                entity.Property(e => e.FkAnvandareKontakt).HasColumnName("FK_ANVANDARE_KONTAKT");

                entity.Property(e => e.FkArtikeldialekt).HasColumnName("FK_ARTIKELDIALEKT");

                entity.Property(e => e.FkAttestflode).HasColumnName("FK_ATTESTFLODE");

                entity.Property(e => e.FkAviseringsMetod).HasColumnName("FK_AviseringsMetod");

                entity.Property(e => e.FkBetalare).HasColumnName("FK_BETALARE");

                entity.Property(e => e.FkBetalvillkor).HasColumnName("FK_BETALVILLKOR");

                entity.Property(e => e.FkBetalvillkorSjalvfaktura).HasColumnName("FK_BETALVILLKOR_SJALVFAKTURA");

                entity.Property(e => e.FkBilder).HasColumnName("FK_BILDER");

                entity.Property(e => e.FkBolagInternkund).HasColumnName("FK_BOLAG_Internkund");

                entity.Property(e => e.FkCountersMall).HasColumnName("FK_COUNTERS_MALL");

                entity.Property(e => e.FkEdijobbAvisering).HasColumnName("FK_EDIJOBB_AVISERING");

                entity.Property(e => e.FkEdijobbSms).HasColumnName("FK_EDIJOBB_SMS");

                entity.Property(e => e.FkEntreprenad).HasColumnName("FK_ENTREPRENAD");

                entity.Property(e => e.FkEntreprenader).HasColumnName("FK_ENTREPRENADER");

                entity.Property(e => e.FkEnumAvrakningslayout).HasColumnName("FK_EnumAvrakningslayout");

                entity.Property(e => e.FkEnumBomkorningsMetod).HasColumnName("FK_EnumBomkorningsMetod");

                entity.Property(e => e.FkEnumBrytpunktPeriod).HasColumnName("FK_EnumBrytpunkt_Period");

                entity.Property(e => e.FkEnumFakturaBrytDebetKredit).HasColumnName("FK_EnumFakturaBryt_DebetKredit");

                entity.Property(e => e.FkEnumFakturaBrytOmvandMoms).HasColumnName("FK_EnumFakturaBryt_OmvandMoms");

                entity.Property(e => e.FkEnumFakturaPaslagRedovisning).HasColumnName("FK_EnumFakturaPaslagRedovisning");

                entity.Property(e => e.FkEnumFakturalayout).HasColumnName("FK_EnumFakturalayout");

                entity.Property(e => e.FkEnumFgvmodell).HasColumnName("FK_EnumFGVModell");

                entity.Property(e => e.FkEnumKravPaFotoSignatur).HasColumnName("FK_EnumKravPaFotoSignatur");

                entity.Property(e => e.FkEnumLitteraMode).HasColumnName("FK_EnumLitteraMode");

                entity.Property(e => e.FkEnumProcentuelltTillaggPrincip).HasColumnName("FK_EnumProcentuelltTillaggPrincip");

                entity.Property(e => e.FkEwcgrupp).HasColumnName("FK_EWCGrupp");

                entity.Property(e => e.FkFakturabrytArbetsordernr).HasColumnName("FK_FAKTURABRYT_ARBETSORDERNR");

                entity.Property(e => e.FkFakturabrytArbetsplats)
                    .HasColumnName("FK_FAKTURABRYT_ARBETSPLATS")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FkFakturabrytBetalningsunderlag).HasColumnName("FK_FAKTURABRYT_BETALNINGSUNDERLAG");

                entity.Property(e => e.FkFakturabrytKontakt).HasColumnName("FK_FAKTURABRYT_KONTAKT");

                entity.Property(e => e.FkFakturabrytKundref).HasColumnName("FK_FAKTURABRYT_KUNDREF");

                entity.Property(e => e.FkFakturabrytLittera).HasColumnName("FK_FAKTURABRYT_LITTERA");

                entity.Property(e => e.FkFakturabrytReferens).HasColumnName("FK_FAKTURABRYT_REFERENS");

                entity.Property(e => e.FkFakturabrytResa).HasColumnName("FK_FAKTURABRYT_RESA");

                entity.Property(e => e.FkFakturabrytResurs).HasColumnName("FK_FAKTURABRYT_RESURS");

                entity.Property(e => e.FkFakturabrytVerksamhet).HasColumnName("FK_FAKTURABRYT_VERKSAMHET");

                entity.Property(e => e.FkFakturakoer).HasColumnName("FK_FAKTURAKOER");

                entity.Property(e => e.FkFakturakoerAvrakning).HasColumnName("FK_FAKTURAKOER_AVRAKNING");

                entity.Property(e => e.FkFaktureringsavgifter).HasColumnName("FK_FAKTURERINGSAVGIFTER");

                entity.Property(e => e.FkKommunikationskanal).HasColumnName("FK_KOMMUNIKATIONSKANAL");

                entity.Property(e => e.FkKoncern).HasColumnName("FK_KONCERN");

                entity.Property(e => e.FkKontoBonusBalans).HasColumnName("FK_KONTO_BONUS_BALANS");

                entity.Property(e => e.FkKontoBonusIntakt).HasColumnName("FK_KONTO_BONUS_INTAKT");

                entity.Property(e => e.FkKreditforsakratbeloppValuta).HasColumnName("FK_KREDITFORSAKRATBELOPP_VALUTA");

                entity.Property(e => e.FkKundbokforingsmall).HasColumnName("FK_KUNDBOKFORINGSMALL");

                entity.Property(e => e.FkKundgrupper).HasColumnName("FK_KUNDGRUPPER");

                entity.Property(e => e.FkKundkategorier).HasColumnName("FK_KUNDKATEGORIER");

                entity.Property(e => e.FkLanderMoms).HasColumnName("FK_LANDER_MOMS");

                entity.Property(e => e.FkLinjer).HasColumnName("FK_LINJER");

                entity.Property(e => e.FkMellanskillnadsmall).HasColumnName("FK_MELLANSKILLNADSMALL");

                entity.Property(e => e.FkMinimumDebiteringsArtikel).HasColumnName("FK_MinimumDebiteringsArtikel");

                entity.Property(e => e.FkMomskodBonus).HasColumnName("FK_MOMSKOD_BONUS");

                entity.Property(e => e.FkMomslandkod).HasColumnName("FK_MOMSLANDKOD");

                entity.Property(e => e.FkOmvandSkatt).HasColumnName("FK_OMVAND_SKATT");

                entity.Property(e => e.FkSchemaFakturering).HasColumnName("FK_SCHEMA_FAKTURERING");

                entity.Property(e => e.FkSprak).HasColumnName("FK_SPRAK");

                entity.Property(e => e.FkValutor).HasColumnName("FK_VALUTOR");

                entity.Property(e => e.Gannr)
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasColumnName("GANnr");

                entity.Property(e => e.Ggn)
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasColumnName("GGN");

                entity.Property(e => e.Iban)
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasColumnName("IBAN");

                entity.Property(e => e.Info)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.InkluderaArbetsordersIfakturan).HasColumnName("InkluderaArbetsordersIFakturan");

                entity.Property(e => e.InkluderaVagsedlarIfakturan).HasColumnName("InkluderaVagsedlarIFakturan");

                entity.Property(e => e.KravAo).HasColumnName("KravAO");

                entity.Property(e => e.KravInstruktion)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.KreditInfo)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Kreditforsakringsdatum).HasColumnType("datetime");

                entity.Property(e => e.Kund)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.KundNamn)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.KundNr)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.KundNrEkonomi)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Kundid)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LitteraMask)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.LitteraMaskDescription)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.MallNamn)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Orgnr)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Pallregnr)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.PersonNrSwish)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.PopupInfo)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Postgiro)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.RapporteraDataTillNvv).HasColumnName("RapporteraDataTillNVV");

                entity.Property(e => e.Riksbankskod)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.RowVersion)
                    .IsRowVersion()
                    .IsConcurrencyToken();

                entity.Property(e => e.SkapadAnvandare)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SkapadTidpunkt).HasColumnType("datetime");

                entity.Property(e => e.SparrSkrymmeMobilt).HasDefaultValueSql("((0))");

                entity.Property(e => e.SparrText)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Swift)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.TelefonNrSwish)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Tm).HasColumnName("TM");

                entity.Property(e => e.TransportsedelMask)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.VarningText)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Vat)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.HasOne(d => d.FkAdresserBesoksadressNavigation)
                    .WithMany(p => p.KunderFkAdresserBesoksadressNavigation)
                    .HasForeignKey(d => d.FkAdresserBesoksadress)
                    .HasConstraintName("FK_KUNDER_ADRESSER1");

                entity.HasOne(d => d.FkAdresserFakturaadressNavigation)
                    .WithMany(p => p.KunderFkAdresserFakturaadressNavigation)
                    .HasForeignKey(d => d.FkAdresserFakturaadress)
                    .HasConstraintName("FK_KUNDER_ADRESSER");

                entity.HasOne(d => d.FkBetalareNavigation)
                    .WithMany(p => p.InverseFkBetalareNavigation)
                    .HasForeignKey(d => d.FkBetalare)
                    .HasConstraintName("FK_KUNDER_KUNDER");

                entity.HasOne(d => d.FkEntreprenadNavigation)
                    .WithMany(p => p.InverseFkEntreprenadNavigation)
                    .HasForeignKey(d => d.FkEntreprenad)
                    .HasConstraintName("FK_KUNDER_ENTREPRENAD");

                entity.HasOne(d => d.FkKoncernNavigation)
                    .WithMany(p => p.InverseFkKoncernNavigation)
                    .HasForeignKey(d => d.FkKoncern)
                    .HasConstraintName("FK_KUNDER_KUNDER1");
            });

            modelBuilder.Entity<Positioner>(entity =>
            {
                entity.HasKey(e => e.Pk);

                entity.ToTable("POSITIONER");

                entity.Property(e => e.Pk).HasColumnName("PK");

                entity.Property(e => e.ReverseGeocodeResult)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Xkoord).HasColumnName("XKoord");

                entity.Property(e => e.Ykoord).HasColumnName("YKoord");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}