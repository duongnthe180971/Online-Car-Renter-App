using CarRentalAPI.DTOs.Requests;
using CarRentalAPI.DTOs.Responses;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRentalAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private readonly CarRentContext _context;

        public RentalController(CarRentContext context)
        {
            _context = context;
        }

        [HttpGet("rental")]
        public async Task<IActionResult> GetRentals()
        {
            var list = await _context.Rentals.Select(r => new RentalResponse
            {
                RentalId = r.RentalId,
                CarId = r.CarId,
                CustomerId = r.CustomerId,
                RentalStatus = r.RentalStatus,
                RentalStart = r.RentalStart,
                RentalEnd = r.RentalEnd
            }).ToListAsync();
            return Ok(list);
        }

        [HttpGet("rental/{rentalId}")]
        public async Task<IActionResult> GetRentalById(int rentalId)
        {
            var rental = await _context.Rentals
                .Include(x => x.Car)
                .Include(x => x.Customer)
                .FirstOrDefaultAsync(x => x.RentalId == rentalId);

            if (rental == null) return NotFound(new { message = "Rental not found" });
            return Ok(rental);
        }

        [HttpPost("rental")]
        public async Task<IActionResult> AddRental([FromBody] CreateRentalDto dto)
        {
            var rental = new Rental
            {
                CarId = dto.CarID,
                CustomerId = dto.CustomerID,
                RentalStart = DateOnly.FromDateTime(dto.RentalStart),
                RentalEnd = DateOnly.FromDateTime(dto.RentalEnd),
                RentalStatus = dto.RentalStatus
            };

            _context.Rentals.Add(rental);
            await _context.SaveChangesAsync();
            return StatusCode(201, "New rental added successfully");
        }

        [HttpPut("rentals/{id}")]
        public async Task<IActionResult> UpdateRentalStatus(int id, [FromBody] Dictionary<string, int> b)
        {
            var rental = await _context.Rentals.FindAsync(id);
            if (rental != null)
            {
                rental.RentalStatus = b["status"];
                await _context.SaveChangesAsync();
                return Ok(new { message = "Rental status updated successfully" });
            }
            return NotFound(new { message = "Rental not found" });
        }

        [HttpDelete("rentals/{id}")]
        public async Task<IActionResult> DeleteRental(int id)
        {
            await _context.Payments.Where(p => p.RentalId == id).ExecuteDeleteAsync();
            await _context.Rentals.Where(r => r.RentalId == id).ExecuteDeleteAsync();
            return Ok(new { message = "Rental deleted successfully" });
        }
    }
}