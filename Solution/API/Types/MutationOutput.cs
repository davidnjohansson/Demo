namespace T5.API.Types
{
    public class MutationOutput : Output
    {
        public int? Pk { get; set; }

        public MutationOutput()
        {

        }

        public MutationOutput(int? pk)
        {
            Pk = pk;
        }
    }
}
