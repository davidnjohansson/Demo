using API.Data.Export.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Export.Configurations
{
    public partial class PersonConfiguration : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> entity)
        {
            entity.Property(e => e.PersonName)
                .HasMaxLength(8000)
                .IsUnicode(false);

            entity.Property(e => e.SocialSecurityNumber)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Address)
                .WithMany(p => p.Persons)
                .HasForeignKey(d => d.AddressId)
                .HasConstraintName("FK_PERSONER_ADRESSER");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<Person> entity);
    }
}
