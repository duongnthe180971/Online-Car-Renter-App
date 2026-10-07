using System.Text.Json.Serialization;

namespace CarRentalAPI.DTOs.Responses
{
    public class FinanceResponse
    {
        [JsonPropertyName("FinanceID")] public int FinanceId { get; set; }
        [JsonPropertyName("Date")] public DateOnly Date { get; set; }
        [JsonPropertyName("totalMoney")] public int TotalMoney { get; set; }
        [JsonPropertyName("AccID")] public int? AccId { get; set; }
    }
}
