using API.Entities;

namespace API.GraphQL
{
    public class Subscription
    {
        [Subscribe]
        public Arbetsplatser ArbetsplatsInserted([EventMessage] Arbetsplatser arbetsplats) => arbetsplats;

        [Subscribe]
        public Arbetsplatser ArbetsplatsUpdated([EventMessage] Arbetsplatser arbetsplats) => arbetsplats;
    }
}
