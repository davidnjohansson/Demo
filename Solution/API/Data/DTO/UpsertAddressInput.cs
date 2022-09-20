using T5.API.Types;

namespace API.Data.DTO
{
    public class UpsertAddressInput : Input
    {
        public string? Address1 { get; set; }
        public string? City { get; set; }
        public string? ZipCode { get; set; }
        public UpsertPositionInput? UpsertPositionInput { get; set; }
    }
}
