using CarRentalAPI.DTOs.Requests;
using CarRentalAPI.DTOs.Responses;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRentalAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly CarRentContext _context;

        public FeedbackController(CarRentContext context)
        {
            _context = context;
        }

        [HttpGet("feedback")]
        public async Task<IActionResult> GetFeedbacks()
        {
            var list = await _context.Feedbacks.Select(f => new FeedbackResponse
            {
                FeedbackId = f.FeedbackId,
                CarId = f.CarId,
                CustomerId = f.CustomerId,
                FeedbackDescription = f.FeedbackDescription,
                FeedbackDate = f.FeedbackDate,
                Rate = f.Rate
            }).ToListAsync();
            return Ok(list);
        }

        [HttpGet("feedback/{carId}")]
        public async Task<IActionResult> GetFeedbackByCar(int carId)
        {
            var list = await _context.Feedbacks.Include(f => f.Customer).Where(f => f.CarId == carId)
                .Select(f => new FeedbackResponse
                {
                    FeedbackId = f.FeedbackId,
                    CarId = f.CarId,
                    CustomerId = f.CustomerId,
                    FeedbackDescription = f.FeedbackDescription,
                    FeedbackDate = f.FeedbackDate,
                    Rate = f.Rate,
                    UserName = f.Customer.UserName
                }).ToListAsync();
            return Ok(list);
        }

        [HttpPost("feedback")]
        public async Task<IActionResult> AddFeedback([FromBody] CreateFeedbackDto dto)
        {
            var feedback = new Feedback
            {
                CarId = dto.CarID,
                CustomerId = dto.CustomerID,
                FeedbackDescription = dto.FeedbackDescription,
                Rate = dto.Rate,
                FeedbackDate = DateOnly.FromDateTime(DateTime.Now)
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return StatusCode(201, "Feedback submitted successfully");
        }

        [HttpPut("car/update-rating/{carId}")]
        public async Task<IActionResult> UpdateCarRating(int carId)
        {
            var avg = await _context.Feedbacks.Where(f => f.CarId == carId).AverageAsync(f => (double?)f.Rate);

            if (avg != null)
            {
                var car = await _context.Cars.FindAsync(carId);
                if (car != null)
                {
                    car.Rate = (int)Math.Round(avg.Value);
                    await _context.SaveChangesAsync();
                }
                return Ok("Car rating updated successfully");
            }

            return NotFound(new { message = "No feedback found for this car" });
        }
    }
}