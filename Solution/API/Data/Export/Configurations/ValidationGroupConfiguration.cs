using API.Data.Export.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class ValidationGroupConfiguration : IEntityTypeConfiguration<ValidationGroup>
    {
        public void Configure(EntityTypeBuilder<ValidationGroup> entity)
        {
            entity.Property(e => e.GroupName)
                .HasMaxLength(8000)
                .IsUnicode(false);

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<ValidationGroup> entity);
    }
}
