using T5.API.Types;

namespace API.Services.UpsertWorkplace
{
    public class UpsertWorkplaceInput : Input
    {
        public bool? Active { get; set; }
        public string? WorkplaceName { get; set; }
        public int? CustomerId { get; set; }
        public string? Address1 { get; set; }
        public string? City { get; set; }
        public string? ZipCode { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
