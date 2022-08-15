using API.Data;
using API.Data.Entities;

namespace API.GraphQL
{
    public class Query
    {
        [UseOffsetPaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Address> Addresses([Service] DemoDbContext db)
        {
            return db.Addresses;
        }

        [UseOffsetPaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Customer> Customers([Service] DemoDbContext db)
        {
            return db.Customers;
        }

        [UseOffsetPaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Position> Positions([Service] DemoDbContext db)
        {
            return db.Positions;
        }

        [UseOffsetPaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Workplace> Workplaces([Service] DemoDbContext db)
        {
            return db.Workplaces;
        }
    }
}
