using API.Data.Export.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class ContactWorkplaceConfiguration : IEntityTypeConfiguration<ContactWorkplace>
    {
        public void Configure(EntityTypeBuilder<ContactWorkplace> entity)
        {
            entity.HasKey(e => new { e.ContactId, e.WorkplaceId });

            entity.HasOne(d => d.Workplace)
                .WithMany(p => p.ContactWorkplaces)
                .HasForeignKey(d => d.WorkplaceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_KONTAKTER_ARBETSPLATSER_ARBETSPLATSER");

            entity.HasOne(d => d.Contact)
                .WithMany(p => p.ContactWorkplaces)
                .HasForeignKey(d => d.ContactId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_KONTAKTER_ARBETSPLATSER_KONTAKTER");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<ContactWorkplace> entity);
    }
}
