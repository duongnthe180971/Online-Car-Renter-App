using System.Text.Json.Serialization;

namespace CarRentalAPI.DTOs.Responses
{
    public class FeedbackResponse
    {
        [JsonPropertyName("FeedbackID")] public int FeedbackId { get; set; }
        [JsonPropertyName("CarID")] public int? CarId { get; set; }
        [JsonPropertyName("CustomerID")] public int? CustomerId { get; set; }
        [JsonPropertyName("FeedbackDescription")] public string FeedbackDescription { get; set; }
        [JsonPropertyName("FeedbackDate")] public DateOnly FeedbackDate { get; set; }
        [JsonPropertyName("Rate")] public int? Rate { get; set; }
        [JsonPropertyName("UserName")] public string UserName { get; set; }
    }
}
