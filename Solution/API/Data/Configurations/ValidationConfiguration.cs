using API.Data.Export.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class ValidationConfiguration : IEntityTypeConfiguration<Validation>
    {
        public void Configure(EntityTypeBuilder<Validation> entity)
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Name)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.HasOne(d => d.ValidationGroup)
                .WithMany(p => p.Validations)
                .HasForeignKey(d => d.ValidationGroupId)
                .HasConstraintName("FK_VALIDERING_VALIDERING_GRUPP");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<Validation> entity);
    }
}
