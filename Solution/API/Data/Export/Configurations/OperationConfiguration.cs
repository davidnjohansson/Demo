using API.Data.Export.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class OperationConfiguration : IEntityTypeConfiguration<Operation>
    {
        public void Configure(EntityTypeBuilder<Operation> entity)
        {
            entity.HasKey(e => e.Id);

            entity
                .Property(e => e.Active)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            entity
                .Property(e => e.OperationName)
                .HasMaxLength(8000)
                .IsUnicode(false);

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<Operation> entity);
    }
}
