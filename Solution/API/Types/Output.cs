namespace T5.API.Types
{
    public abstract class Output
    {
        public List<ValidationError> ValidationErrors { get; set; }

        public Output(List<ValidationError>? validationErrors = null)
        {
            ValidationErrors = validationErrors ?? new List<ValidationError>();
        }
    }
}
