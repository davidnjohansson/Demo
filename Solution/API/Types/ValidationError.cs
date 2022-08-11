namespace T5.API.Types
{
    public class ValidationError
    {
        public string Message { get; set; } = string.Empty;
        public string Property { get; set; } = string.Empty;
    }
}
