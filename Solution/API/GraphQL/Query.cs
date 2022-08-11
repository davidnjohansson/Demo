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
        public IQueryable<Adresser> Adresser([Service] T6DbContext db)
        {
            return db.Adresser;
        }

        [UseOffsetPaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Arbetsplatser> Arbetsplatser([Service] T6DbContext db)
        {
            return db.Arbetsplatser;
        }

        [UseOffsetPaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Kunder> Kunder([Service] T6DbContext db)
        {
            return db.Kunder;
        }

        [UseOffsetPaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Positioner> Positioner([Service] T6DbContext db)
        {
            return db.Positioner;
        }
    }
}
