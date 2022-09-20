using T5.API.Types;

namespace API.Data.DTO
{
    public class UpsertPositionInput : Input
    {
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
