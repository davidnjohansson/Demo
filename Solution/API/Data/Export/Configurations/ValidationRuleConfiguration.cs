using API.Data.Export.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class ValidationRuleConfiguration : IEntityTypeConfiguration<ValidationRule>
    {
        public void Configure(EntityTypeBuilder<ValidationRule> entity)
        {
            entity.Property(e => e.EntityName)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.Property(e => e.ErrorMessage)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.Property(e => e.PropertyName)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.Property(e => e.RegexPattern)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.Property(e => e.ValueAlphanumeric)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.Property(e => e.ValueDateTime).HasColumnType("datetime");

            entity.HasOne(d => d.InverseValidationRule)
                .WithMany(p => p.InverseValidationRules)
                .HasForeignKey(d => d.InverseValidationRuleId)
                .HasConstraintName("FK_VALIDERING_REGEL_VALIDERING_REGEL");

            entity.HasOne(d => d.Validation)
                .WithMany(p => p.ValidationRules)
                .HasForeignKey(d => d.ValidationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VALIDERING_REGEL_VALIDERING");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<ValidationRule> entity);
    }
}
