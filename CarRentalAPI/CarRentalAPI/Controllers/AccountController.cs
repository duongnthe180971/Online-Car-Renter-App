using CarRentalAPI.DTOs.Requests;
using CarRentalAPI.DTOs.Responses;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRentalAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly CarRentContext _context;

        public AccountController(CarRentContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAccount([FromBody] RegisterUserDto dto)
        {
            var acc = new Account
            {
                UserName = dto.Username,
                PassWord = dto.Password,
                Gender = (dto.Gender == "1" || dto.Gender?.ToLower() == "true"),
                Dob = DateTime.TryParse(dto.Dob, out var d) ? DateOnly.FromDateTime(d) : DateOnly.FromDateTime(DateTime.Now),
                Phone = dto.Phone,
                Email = dto.Email,
                Address = dto.Address,
                Role = int.TryParse(dto.Role, out var r) ? r : 3,
                Status = true
            };

            _context.Accounts.Add(acc);
            await _context.SaveChangesAsync();
            if (acc.Role == 2)
            {
                var newGarage = new Garage
                {
                    CarOwnerId = acc.Id
                };
                _context.Garages.Add(newGarage);
                await _context.SaveChangesAsync();
            }

            return Ok(new { message = "User registered successfully!" });
        }

        [HttpGet("account")]
        public async Task<IActionResult> GetAccounts()
        {
            var list = await _context.Accounts.Select(a => new AccountResponse
            {
                Id = a.Id,
                UserName = a.UserName,
                PassWord = a.PassWord,
                Gender = a.Gender,
                Role = a.Role,
                Dob = a.Dob,
                Phone = a.Phone,
                Email = a.Email,
                Address = a.Address,
                Status = a.Status
            }).ToListAsync();
            return Ok(list);
        }

        [HttpGet("account/{id:int}")]
        public async Task<IActionResult> GetAccount(int id)
        {
            var a = await _context.Accounts.Where(x => x.Id == id).Select(a => new AccountResponse
            {
                Id = a.Id,
                UserName = a.UserName,
                PassWord = a.PassWord,
                Gender = a.Gender,
                Role = a.Role,
                Dob = a.Dob,
                Phone = a.Phone,
                Email = a.Email,
                Address = a.Address,
                Status = a.Status
            }).FirstOrDefaultAsync();
            return a == null ? NotFound(new { message = "Account not found" }) : Ok(a);
        }

        [HttpGet("account/{identifier}")]
        public async Task<IActionResult> GetAccountStr(string identifier)
        {
            var a = await _context.Accounts.Where(x => x.UserName == identifier || x.Email == identifier).Select(a => new AccountResponse
            {
                Id = a.Id,
                UserName = a.UserName,
                PassWord = a.PassWord,
                Gender = a.Gender,
                Role = a.Role,
                Dob = a.Dob,
                Phone = a.Phone,
                Email = a.Email,
                Address = a.Address,
                Status = a.Status
            }).FirstOrDefaultAsync();
            return a == null ? NotFound("User not found") : Ok(a);
        }

        [HttpPut("account/{id}")]
        public async Task<IActionResult> UpdateAcc(int id, [FromBody] UpdateAccountDto dto)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null) return NotFound();

            account.UserName = dto.Name;
            account.Gender = dto.Gender;
            account.Dob = DateOnly.FromDateTime(dto.Dob);
            account.Phone = dto.Phone;
            account.Email = dto.Email;
            account.Address = dto.Address;

            await _context.SaveChangesAsync();
            return Ok("Account status updated successfully");
        }

        [HttpPut("account/{id}/change-password")]
        public async Task<IActionResult> ChangePw(int id, [FromBody] ChangePasswordDto dto)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null) return NotFound();

            account.PassWord = dto.NewPassword;
            await _context.SaveChangesAsync();
            return Ok("Password updated successfully");
        }

        [HttpPut("deactivate-user/{id}")]
        public async Task<IActionResult> Deactivate(int id)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var acc = await _context.Accounts.FindAsync(id);
                if (acc != null) acc.Status = false;

                var garages = await _context.Garages.Where(g => g.CarOwnerId == id).ToListAsync();
                foreach (var g in garages)
                {
                    await _context.Cars
                        .Where(c => c.GarageId == g.GarageId)
                        .ExecuteUpdateAsync(c => c.SetProperty(x => x.CarStatus, "Deleted"));
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new { message = "User deactivated and associated cars marked as deleted" });
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new { message = "Server error" });
            }
        }
    }
}