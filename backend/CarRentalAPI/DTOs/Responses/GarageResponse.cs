using System.Text.Json.Serialization;

namespace CarRentalAPI.DTOs.Responses
{
    public class GarageResponse
    {
        [JsonPropertyName("GarageID")] public int GarageId { get; set; }
        [JsonPropertyName("CarOwnerID")] public int? CarOwnerId { get; set; }
    }
}
