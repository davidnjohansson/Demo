using API.Data.Export.Entities;
using API.Data.Export.Configurations;
using Microsoft.EntityFrameworkCore;
using API.Types;

namespace API.Data.Export
{
    public partial class DemoDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public DemoDbContext(DbContextOptions<DemoDbContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<Address> Addresses { get; set; } = null!;
        public DbSet<AddressType> AddressTypes { get; set; } = null!;
        public DbSet<Business> Businesses { get; set; } = null!;
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Position> Positions { get; set; } = null!;
        public DbSet<ValidationBusiness> ValidationBusinesses { get; set; } = null!;
        public DbSet<Validation> Validations { get; set; } = null!;
        public DbSet<ValidationCustomer> ValidationCustomers { get; set; } = null!;
        public DbSet<ValidationGroup> ValidationGroups { get; set; } = null!;
        public DbSet<ValidationRule> ValidationRules { get; set; } = null!;
        public DbSet<Workplace> Workplaces { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLazyLoadingProxies()
                .UseSqlServer(_configuration[nameof(Secret.ConnectionString)]);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // https://docs.microsoft.com/en-us/ef/core/saving/cascade-delete#impact-on-savechanges-behavior
            // Throw InvalidOperationException if trying to delete a required relationship.
            // Deletion of required relationship should be handled manually for each entity.
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.UseCollation("Finnish_Swedish_CI_AS");

            modelBuilder.ApplyConfiguration(new AddressConfiguration());
            modelBuilder.ApplyConfiguration(new AddressTypeConfiguration());
            modelBuilder.ApplyConfiguration(new BusinessConfiguration());
            modelBuilder.ApplyConfiguration(new CustomerConfiguration());
            modelBuilder.ApplyConfiguration(new PositionConfiguration());
            modelBuilder.ApplyConfiguration(new ValidationBusinessConfiguration());
            modelBuilder.ApplyConfiguration(new ValidationConfiguration());
            modelBuilder.ApplyConfiguration(new ValidationCustomerConfiguration());
            modelBuilder.ApplyConfiguration(new ValidationGroupConfiguration());
            modelBuilder.ApplyConfiguration(new ValidationRuleConfiguration());
            modelBuilder.ApplyConfiguration(new WorkplaceConfiguration());
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
