namespace T5.API.Types
{
    public class ValidationError
    {
        public string Message { get; set; } = string.Empty;
        public string TypeName { get; set; } = string.Empty;
        public string PropertyName { get; set; } = string.Empty;
    }
}
