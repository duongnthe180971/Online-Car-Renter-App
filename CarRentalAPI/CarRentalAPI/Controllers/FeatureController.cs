using CarRentalAPI.DTOs.Responses;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRentalAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class FeatureController : ControllerBase
    {
        private readonly CarRentContext _context;

        public FeatureController(CarRentContext context)
        {
            _context = context;
        }

        [HttpGet("feature")]
        [HttpGet("features")]
        public async Task<IActionResult> GetAllFeatures()
        {
            var list = await _context.Features.Select(f => new FeatureResponse
            {
                FeatureId = f.FeatureId,
                Name = f.Name
            }).ToListAsync();
            return Ok(list);
        }

        [HttpGet("features/{carId}")]
        public async Task<IActionResult> GetCarFeatures(int carId)
        {
            var car = await _context.Cars.Include(x => x.Features).FirstOrDefaultAsync(x => x.CarId == carId);
            return Ok(car?.Features.Select(f => new { f.Name }) ?? Enumerable.Empty<object>());
        }

        [HttpPost("features")]
        public async Task<IActionResult> AddFeature([FromBody] Feature f)
        {
            _context.Features.Add(f);
            await _context.SaveChangesAsync();
            return StatusCode(201, new FeatureResponse { FeatureId = f.FeatureId, Name = f.Name });
        }

        [HttpDelete("features/{id}")]
        public async Task<IActionResult> DeleteFeature(int id)
        {
            var feature = await _context.Features
                .Include(x => x.Cars)
                .Include(x => x.CarsNavigation)
                .FirstOrDefaultAsync(x => x.FeatureId == id);

            if (feature != null)
            {
                feature.Cars.Clear();
                feature.CarsNavigation.Clear();
                _context.Features.Remove(feature);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Feature removed successfully!" });
            }
            return NotFound(new { message = "Feature not found." });
        }
    }
}