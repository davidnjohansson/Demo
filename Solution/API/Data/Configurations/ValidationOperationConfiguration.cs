using API.Data.Export.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class ValidationOperationConfiguration : IEntityTypeConfiguration<ValidationOperation>
    {
        public void Configure(EntityTypeBuilder<ValidationOperation> entity)
        {
            entity.HasKey(e => e.Id);

            entity.HasOne(d => d.Validation)
                .WithMany(p => p.ValidationOperations)
                .HasForeignKey(d => d.ValidationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VALIDERING_VERKSAMHETER_VALIDERING");

            entity.HasOne(d => d.Operation)
                .WithMany(p => p.ValidationOperations)
                .HasForeignKey(d => d.OperationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VALIDERING_VERKSAMHETER_VERKSAMHETER");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<ValidationOperation> entity);
    }
}
