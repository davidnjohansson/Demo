using API.Data.Export.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class ValidationCustomerConfiguration : IEntityTypeConfiguration<ValidationCustomer>
    {
        public void Configure(EntityTypeBuilder<ValidationCustomer> entity)
        {
            entity.HasKey(e => e.Id);

            entity.HasOne(d => d.Customer)
                .WithMany(p => p.ValidationCustomers)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VALIDERING_KUNDER_KUNDER");

            entity.HasOne(d => d.Validation)
                .WithMany(p => p.ValidationCustomers)
                .HasForeignKey(d => d.ValidationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VALIDERING_KUNDER_VALIDERING");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<ValidationCustomer> entity);
    }
}
