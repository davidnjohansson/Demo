using API.Data.Export.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class WorkplaceConfiguration : IEntityTypeConfiguration<Workplace>
    {
        public void Configure(EntityTypeBuilder<Workplace> entity)
        {
            entity.HasKey(e => e.Id);

            entity.HasIndex(e => e.CustomerId, "_dta_index_ARBETSPLATSER_5_773577794__K3_1_2_4_5_6_7_8_9_10_11_12_13_14_15_16_17_18_19_20_21_22_4364");

            entity.Property(e => e.Active)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            entity.Property(e => e.WorkplaceName)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.HasOne(d => d.Address)
                .WithMany(p => p.Workplaces)
                .HasForeignKey(d => d.AddressId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ARBETSPLATSER_ADRESSER");

            entity.HasOne(d => d.Contact)
                .WithMany(p => p.Workplaces)
                .HasForeignKey(d => d.ContactId)
                .HasConstraintName("FK_ARBETSPLATSER_KONTAKTER");

            entity.HasOne(d => d.Customer)
                .WithMany(p => p.Workplaces)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ARBETSPLATSER_KUNDER");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<Workplace> entity);
    }
}
