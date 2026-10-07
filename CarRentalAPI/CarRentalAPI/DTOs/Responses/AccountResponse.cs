using System.Text.Json.Serialization;

namespace CarRentalAPI.DTOs.Responses
{
    public class AccountResponse
    {
        [JsonPropertyName("id")] public int Id { get; set; }
        [JsonPropertyName("UserName")] public string UserName { get; set; }
        [JsonPropertyName("PassWord")] public string PassWord { get; set; }
        [JsonPropertyName("Gender")] public bool Gender { get; set; }
        [JsonPropertyName("Role")] public int Role { get; set; }
        [JsonPropertyName("DOB")] public DateOnly Dob { get; set; }
        [JsonPropertyName("Phone")] public string Phone { get; set; }
        [JsonPropertyName("Email")] public string Email { get; set; }
        [JsonPropertyName("Address")] public string Address { get; set; }
        [JsonPropertyName("Status")] public bool? Status { get; set; }
    }
}
