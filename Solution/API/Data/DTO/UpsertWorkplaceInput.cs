using T5.API.Types;

namespace API.Data.DTO
{
    public class UpsertWorkplaceInput : Input
    {
        public bool? Active { get; set; }
        public string? WorkplaceName { get; set; }
        public int? CustomerId { get; set; }
        public UpsertAddressInput? UpsertAddressInput { get; set; }
    }
}
