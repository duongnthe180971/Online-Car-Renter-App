namespace CarRentalAPI.DTOs.Requests
{
    public class UpdateAccountDto
    {
        public string Name { get; set; }
        public bool Gender { get; set; }
        public DateTime Dob { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}