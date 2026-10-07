using CarRentalAPI.DTOs.Requests;
using CarRentalAPI.DTOs.Responses;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRentalAPI.Controllers
{
    [Route("api/finance")]
    [ApiController]
    public class FinanceController : ControllerBase
    {
        private readonly CarRentContext _context;

        public FinanceController(CarRentContext context)
        {
            _context = context;
        }

        [HttpGet("{year}")]
        public async Task<IActionResult> GetFinance(int year)
        {
            var list = await _context.Bills.Where(b => b.Date.Year == year).Select(b => new FinanceResponse
            {
                FinanceId = b.FinanceId,
                Date = b.Date,
                TotalMoney = b.TotalMoney,
                AccId = b.AccId
            }).ToListAsync();
            return Ok(list);
        }

        [HttpGet("carOwner/{id}/{year}")]
        public async Task<IActionResult> GetFinanceOwner(int id, int year)
        {
            var list = await _context.Bills.Where(b => b.Date.Year == year && b.AccId == id).Select(b => new FinanceResponse
            {
                FinanceId = b.FinanceId,
                Date = b.Date,
                TotalMoney = b.TotalMoney,
                AccId = b.AccId
            }).ToListAsync();
            if (!list.Any()) return NotFound(new { message = "No financial data found for this year" });
            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> AddFinance([FromBody] CreateFinanceDto dto)
        {
            var bill = new Bill
            {
                AccId = dto.AccID,
                Date = DateOnly.FromDateTime(dto.Date),
                TotalMoney = dto.TotalMoney
            };

            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();
            return StatusCode(201, "Bill entry created successfully");
        }
    }
}