using System.Text.Json.Serialization;

namespace CarRentalAPI.DTOs.Responses
{
    public class RegisterCarResponse
    {
        [JsonPropertyName("CarID")] public int CarId { get; set; }
        [JsonPropertyName("GarageID")] public int? GarageId { get; set; }
        [JsonPropertyName("CarName")] public string CarName { get; set; }
        [JsonPropertyName("Brand")] public string Brand { get; set; }
        [JsonPropertyName("Price")] public int Price { get; set; }
        [JsonPropertyName("CarType")] public string CarType { get; set; }
        [JsonPropertyName("Seats")] public int Seats { get; set; }
        [JsonPropertyName("Gear")] public string Gear { get; set; }
        [JsonPropertyName("Fuel")] public string Fuel { get; set; }
        [JsonPropertyName("CarStatus")] public string CarStatus { get; set; }
        [JsonPropertyName("CarImage")] public string CarImage { get; set; }
        [JsonPropertyName("CarDescription")] public string CarDescription { get; set; }
        [JsonPropertyName("License")] public string License { get; set; }
    }
}
