using API.Data.Export.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class WorkplaceOwnerConfiguration : IEntityTypeConfiguration<WorkplaceOwner>
    {
        public void Configure(EntityTypeBuilder<WorkplaceOwner> entity)
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.FromDay).HasColumnType("datetime");

            entity.Property(e => e.CreatedBy)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasDefaultValueSql("(getdate())");

            entity.Property(e => e.ExecutedAt).HasColumnType("datetime");

            entity.HasOne(d => d.OldInvoiceAddress)
                .WithMany(p => p.OldInvoiceAddressFor)
                .HasForeignKey(d => d.OldInvoiceAddressId)
                .HasConstraintName("FK_ARBETSPLATSER_AGARE_ADRESSER");

            entity.HasOne(d => d.NewInvoiceAddress)
                .WithMany(p => p.NewInvoiceAddressFor)
                .HasForeignKey(d => d.NewInvoiceAddressId)
                .HasConstraintName("FK_ARBETSPLATSER_AGARE_ADRESSER1");

            entity.HasOne(d => d.Workplace)
                .WithMany(p => p.WorkplaceOwners)
                .HasForeignKey(d => d.WorkplaceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ARBETSPLATSER_AGARE_ARBETSPLATSER");

            entity.HasOne(d => d.Customer)
                .WithMany(p => p.WorkplaceOwnerFor)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ARBETSPLATSER_AGARE_KUNDER");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<WorkplaceOwner> entity);
    }
}
