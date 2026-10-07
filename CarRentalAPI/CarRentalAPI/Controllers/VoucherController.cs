using CarRentalAPI.DTOs.Requests;
using CarRentalAPI.DTOs.Responses;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRentalAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        private readonly CarRentContext _context;
        private readonly IWebHostEnvironment _env;

        public VoucherController(CarRentContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpGet("voucher")]
        public async Task<IActionResult> GetVouchers()
        {
            var list = await _context.Vouchers.Select(v => new VoucherResponse
            {
                VoucherId = v.VoucherId,
                VoucherCode = v.VoucherCode,
                DiscountAmount = v.DiscountAmount,
                IsClaimed = v.IsClaimed,
                ClaimedBy = v.ClaimedBy,
                Image = v.Image
            }).ToListAsync();
            return Ok(list);
        }

        [HttpPost("voucher")]
        public async Task<IActionResult> CreateVoucher([FromForm] CreateVoucherDto dto)
        {
            if (dto.Image == null)
            {
                return BadRequest(new { message = "Image is required" });
            }

            string vName = $"{DateTime.Now.Ticks}_{dto.Image.FileName}";
            using (var s = new FileStream(Path.Combine(_env.ContentRootPath, "img", "voucher", vName), FileMode.Create))
            {
                await dto.Image.CopyToAsync(s);
            }

            var voucher = new Voucher
            {
                VoucherCode = dto.Code,
                DiscountAmount = dto.DiscountPercentage,
                Image = $"http://localhost:5000/img/voucher/{vName}",
                IsClaimed = false
            };

            _context.Vouchers.Add(voucher);
            await _context.SaveChangesAsync();
            return StatusCode(201, new { message = "Voucher created successfully" });
        }

        [HttpPut("voucher/claim/{voucherId}")]
        public async Task<IActionResult> ClaimVoucher(int voucherId, [FromBody] Dictionary<string, int> b)
        {
            var voucher = await _context.Vouchers.FirstOrDefaultAsync(x => x.VoucherId == voucherId && x.IsClaimed == false);

            if (voucher != null)
            {
                voucher.IsClaimed = true;
                voucher.ClaimedBy = b["userId"];
                await _context.SaveChangesAsync();
                return Ok(new { message = "Voucher claimed successfully" });
            }
            return BadRequest(new { message = "Voucher already claimed or not found" });
        }

        [HttpDelete("voucher/{voucherId}")]
        public async Task<IActionResult> DeleteVoucher(int voucherId)
        {
            await _context.Vouchers.Where(v => v.VoucherId == voucherId).ExecuteDeleteAsync();
            return Ok(new { message = "Voucher deleted successfully" });
        }
    }
}