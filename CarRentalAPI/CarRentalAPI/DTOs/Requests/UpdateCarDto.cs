using Microsoft.AspNetCore.Http;

namespace CarRentalAPI.DTOs.Requests
{
    public class UpdateCarDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public string Features { get; set; }
        public string Type { get; set; }
        public int Seat { get; set; }
        public string Gear { get; set; }
        public string Fuel { get; set; }
        public string Brand { get; set; }
        public IFormFile? Image { get; set; }
    }
}