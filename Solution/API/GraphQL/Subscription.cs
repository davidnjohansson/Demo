using API.Data.Entities;

namespace API.GraphQL
{
    public class Subscription
    {
        [Subscribe]
        public Workplace WorkplaceInserted([EventMessage] Workplace workplace) => workplace;

        [Subscribe]
        public Workplace WorkplaceUpdated([EventMessage] Workplace workplace) => workplace;
    }
}
