using API.Data.Export.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class ValidationBusinessConfiguration : IEntityTypeConfiguration<ValidationBusiness>
    {
        public void Configure(EntityTypeBuilder<ValidationBusiness> entity)
        {
            entity.HasOne(d => d.Validation)
                .WithMany(p => p.ValidationBusinesses)
                .HasForeignKey(d => d.ValidationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VALIDERING_VERKSAMHETER_VALIDERING");

            entity.HasOne(d => d.Business)
                .WithMany(p => p.ValidationBusinesses)
                .HasForeignKey(d => d.BusinessId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VALIDERING_VERKSAMHETER_VERKSAMHETER");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<ValidationBusiness> entity);
    }
}
