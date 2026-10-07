using System.Text.Json.Serialization;

namespace CarRentalAPI.DTOs.Responses
{
    public class VoucherResponse
    {
        [JsonPropertyName("VoucherID")] public int VoucherId { get; set; }
        [JsonPropertyName("VoucherCode")] public string VoucherCode { get; set; }
        [JsonPropertyName("DiscountAmount")] public decimal DiscountAmount { get; set; }
        [JsonPropertyName("IsClaimed")] public bool? IsClaimed { get; set; }
        [JsonPropertyName("ClaimedBy")] public int? ClaimedBy { get; set; }
        [JsonPropertyName("image")] public string Image { get; set; }
    }
}
