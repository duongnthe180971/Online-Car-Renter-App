using CarRentalAPI.DTOs.Responses;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRentalAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class GarageController : ControllerBase
    {
        private readonly CarRentContext _context;

        public GarageController(CarRentContext context)
        {
            _context = context;
        }

        [HttpGet("garage")]
        public async Task<IActionResult> GetGarages()
        {
            var list = await _context.Garages.Select(g => new GarageResponse
            {
                GarageId = g.GarageId,
                CarOwnerId = g.CarOwnerId
            }).ToListAsync();
            return Ok(list);
        }

        [HttpGet("garage/{id}")]
        public async Task<IActionResult> GetGarageByOwner(int id)
        {
            var list = await _context.Garages.Where(g => g.CarOwnerId == id).Select(g => new GarageResponse
            {
                GarageId = g.GarageId,
                CarOwnerId = g.CarOwnerId
            }).ToListAsync();
            return Ok(list);
        }

        [HttpGet("garageCarOwner/{id}")]
        public async Task<IActionResult> GetGarageById(int id)
        {
            var g = await _context.Garages.Where(x => x.GarageId == id).Select(g => new GarageResponse
            {
                GarageId = g.GarageId,
                CarOwnerId = g.CarOwnerId
            }).FirstOrDefaultAsync();
            return g == null ? NotFound(new { message = "Garage not found" }) : Ok(g);
        }
    }
}