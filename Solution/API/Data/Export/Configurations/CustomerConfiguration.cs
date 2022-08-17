using API.Data.Export.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> entity)
        {
            entity.HasIndex(e => e.Id, "_dta_index_KUNDER_5_958626458__K1_8066");

            entity
                .Property(e => e.Active)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            entity
                .Property(e => e.CustomerName)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity
                .Property(e => e.CustomerNo)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.VisitingAddress)
                .WithMany(p => p.VisitingAddressFor)
                .HasForeignKey(d => d.VisitingAddressId)
                .HasConstraintName("FK_KUNDER_ADRESSER1");

            entity.HasOne(d => d.InvoiceAddress)
                .WithMany(p => p.InvoiceAddressFor)
                .HasForeignKey(d => d.InvoiceAddressId)
                .HasConstraintName("FK_KUNDER_ADRESSER");

            entity.HasOne(d => d.Payer)
                .WithMany(p => p.PayerFor)
                .HasForeignKey(d => d.PayerId)
                .HasConstraintName("FK_KUNDER_KUNDER");

            entity.HasOne(d => d.Contractor)
                .WithMany(p => p.ContractorFor)
                .HasForeignKey(d => d.ContractorId)
                .HasConstraintName("FK_KUNDER_ENTREPRENAD");

            entity.HasOne(d => d.Corporation)
                .WithMany(p => p.CorporationFor)
                .HasForeignKey(d => d.CorporationId)
                .HasConstraintName("FK_KUNDER_KUNDER1");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<Customer> entity);
    }
}
