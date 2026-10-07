namespace CarRentalAPI.DTOs.Requests
{
    public class RegisterUserDto
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Gender { get; set; }
        public string? Dob { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? Role { get; set; }
    }
}