using API.Data.Export.Entities;
using API.Data.Import.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> entity)
        {
            entity.HasKey(e => e.Id);

            entity
                .Property(e => e.Active)
                .HasDefaultValueSql("((1))");

            entity
                .Property(e => e.Address1)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.Property(e => e.City)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.Property(e => e.ZipCode)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity
                .HasOne(d => d.AddressType)
                .WithMany(p => p.Addresses)
                .HasForeignKey(d => d.AddressTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ADRESSER_ADRESSTYP");

            entity
                .HasOne(d => d.Position)
                .WithMany(p => p.Addresses)
                .HasForeignKey(d => d.PositionId)
                .HasConstraintName("FK_ADRESSER_POSITIONER");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<Address> entity);
    }
}
