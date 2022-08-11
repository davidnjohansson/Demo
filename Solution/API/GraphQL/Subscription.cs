using API.Entities;

namespace API.GraphQL
{
    public class Subscription
    {
        public Arbetsplatser ArbetsplatsInserted([EventMessage] Arbetsplatser arbetsplats) => arbetsplats;
        public Arbetsplatser ArbetsplatsUpdated([EventMessage] Arbetsplatser arbetsplats) => arbetsplats;
    }
}
