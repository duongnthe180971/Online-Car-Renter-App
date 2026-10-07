using Microsoft.AspNetCore.Http;

namespace CarRentalAPI.DTOs.Requests
{
    public class CreateVoucherDto
    {
        public string Code { get; set; }
        public decimal DiscountPercentage { get; set; }
        public IFormFile Image { get; set; }
    }
}