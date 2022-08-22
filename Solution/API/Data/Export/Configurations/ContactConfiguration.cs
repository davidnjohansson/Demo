using API.Data.Export.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class ContactConfiguration : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> entity)
        {
            entity.HasIndex(e => e.CustomerId, "_dta_index_KONTAKTER_5_494624805__K3_1_2_4_5_6_7");

            entity.Property(e => e.Active)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            entity.Property(e => e.Department)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.Property(e => e.GDPR_Deleted)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.Property(e => e.ContactName)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.HasOne(d => d.Customer)
                .WithMany(p => p.Contacts)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_KONTAKTER_KUNDER");

            entity.HasOne(d => d.Person)
                .WithMany(p => p.Contacts)
                .HasForeignKey(d => d.PersonId)
                .HasConstraintName("FK_KONTAKTER_PERSONER");

            entity.HasMany(d => d.Workplaces)
                .WithMany(p => p.Contacts)
                .UsingEntity<Dictionary<string, object>>(
                    "KONTAKTER_ARBETSPLATSER",
                    l => l.HasOne<Workplace>().WithMany().HasForeignKey("FK_ARBETSPLATSER").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_KONTAKTER_ARBETSPLATSER_ARBETSPLATSER"),
                    r => r.HasOne<Contact>().WithMany().HasForeignKey("FK_KONTAKTER").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_KONTAKTER_ARBETSPLATSER_KONTAKTER"),
                    j =>
                    {
                        j.HasKey("FK_KONTAKTER", "FK_ARBETSPLATSER");

                        j.ToTable("KONTAKTER_ARBETSPLATSER");
                    });

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<Contact> entity);
    }
}
