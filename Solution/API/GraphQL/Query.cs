using API.Data;
using API.Entities;

namespace API.GraphQL
{
    public class Query
    {
        [UseOffsetPaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Adresser> Adresser([Service] DemoDbContext db)
        {
            return db.Adresser;
        }

        [UseOffsetPaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Arbetsplatser> Arbetsplatser([Service] DemoDbContext db)
        {
            return db.Arbetsplatser;
        }

        [UseOffsetPaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Kunder> Kunder([Service] DemoDbContext db)
        {
            return db.Kunder;
        }

        [UseOffsetPaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Positioner> Positioner([Service] DemoDbContext db)
        {
            return db.Positioner;
        }
    }
}
