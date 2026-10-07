using System.Text.Json.Serialization;

namespace CarRentalAPI.DTOs.Responses
{
    public class FeatureResponse
    {
        [JsonPropertyName("FeatureID")] public int FeatureId { get; set; }
        [JsonPropertyName("Name")] public string Name { get; set; }
    }
}
