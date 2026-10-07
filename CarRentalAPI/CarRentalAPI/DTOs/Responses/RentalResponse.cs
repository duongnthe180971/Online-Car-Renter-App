using System.Text.Json.Serialization;

namespace CarRentalAPI.DTOs.Responses
{
    public class RentalResponse
    {
        [JsonPropertyName("RentalID")] public int RentalId { get; set; }
        [JsonPropertyName("CarID")] public int? CarId { get; set; }
        [JsonPropertyName("CustomerID")] public int? CustomerId { get; set; }
        [JsonPropertyName("RentalStatus")] public int RentalStatus { get; set; }
        [JsonPropertyName("RentalStart")] public DateOnly? RentalStart { get; set; }
        [JsonPropertyName("RentalEnd")] public DateOnly? RentalEnd { get; set; }
    }
}
