namespace T5.API.Types
{
    public class MutationOutput : Output
    {
        public int? Id { get; set; }

        public MutationOutput()
        {

        }

        public MutationOutput(int? id)
        {
            Id = id;
        }
    }
}
