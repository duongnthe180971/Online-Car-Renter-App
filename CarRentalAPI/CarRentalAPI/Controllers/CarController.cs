using CarRentalAPI.DTOs.Requests;
using CarRentalAPI.DTOs.Responses;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.ConstrainedExecution;
using System.Text.Json;

namespace CarRentalAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly CarRentContext _context;
        private readonly IWebHostEnvironment _env;

        public CarController(CarRentContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }


        [HttpGet("car")]
        public async Task<IActionResult> GetCars()
        {
            var list = await _context.Cars.Select(c => new CarResponse
            {
                CarId = c.CarId,
                GarageId = c.GarageId,
                CarName = c.CarName,
                Brand = c.Brand,
                Rate = c.Rate,
                Price = c.Price,
                CarType = c.CarType,
                Seats = c.Seats,
                Gear = c.Gear,
                Fuel = c.Fuel,
                CarStatus = c.CarStatus,
                CarImage = c.CarImage,
                CarDescription = c.CarDescription
            }).ToListAsync();
            return Ok(list);
        }

        [HttpGet("cars/pending")]
        public async Task<IActionResult> GetPendingCars([FromQuery] string status = "Pending")
        {
            var list = await _context.Cars.Where(c => c.CarStatus == status).Select(c => new CarResponse
            {
                CarId = c.CarId,
                GarageId = c.GarageId,
                CarName = c.CarName,
                Brand = c.Brand,
                Rate = c.Rate,
                Price = c.Price,
                CarType = c.CarType,
                Seats = c.Seats,
                Gear = c.Gear,
                Fuel = c.Fuel,
                CarStatus = c.CarStatus,
                CarImage = c.CarImage,
                CarDescription = c.CarDescription
            }).ToListAsync();
            return Ok(list);
        }

        [HttpGet("car/{id}")]
        public async Task<IActionResult> GetCar(int id)
        {
            var c = await _context.Cars.Where(x => x.CarId == id).Select(c => new CarResponse
            {
                CarId = c.CarId,
                GarageId = c.GarageId,
                CarName = c.CarName,
                Brand = c.Brand,
                Rate = c.Rate,
                Price = c.Price,
                CarType = c.CarType,
                Seats = c.Seats,
                Gear = c.Gear,
                Fuel = c.Fuel,
                CarStatus = c.CarStatus,
                CarImage = c.CarImage,
                CarDescription = c.CarDescription
            }).FirstOrDefaultAsync();
            return c == null ? NotFound(new { message = "Car not found" }) : Ok(c);
        }

        [HttpPut("updateCar/{carId}")]
        public async Task<IActionResult> UpdateCarDetails(int carId, [FromForm] UpdateCarDto dto)
        {
            var car = await _context.Cars.Include(c => c.Features).FirstOrDefaultAsync(c => c.CarId == carId);
            if (car == null) return NotFound(new { message = "Car not found" });

            if (dto.Image != null)
            {
                string iName = $"{DateTime.Now.Ticks}_{dto.Image.FileName}";
                using (var s = new FileStream(Path.Combine(_env.ContentRootPath, "img", iName), FileMode.Create))
                {
                    await dto.Image.CopyToAsync(s);
                }
                car.CarImage = $"http://localhost:5000/img/{iName}";
            }

            car.CarName = dto.Name;
            car.Brand = dto.Brand;
            car.Price = dto.Price;
            car.CarType = dto.Type;
            car.Seats = dto.Seat;
            car.Gear = dto.Gear;
            car.Fuel = dto.Fuel;
            car.CarDescription = dto.Description;

            car.Features.Clear();

            if (!string.IsNullOrEmpty(dto.Features))
            {
                var options = new JsonSerializerOptions { NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString };
                var fIds = JsonSerializer.Deserialize<List<int>>(dto.Features, options);

                if (fIds != null)
                {
                    car.Features = await _context.Features.Where(f => fIds.Contains(f.FeatureId)).ToListAsync();
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Car updated successfully!" });
        }

        [HttpPut("cars/{id}")]
        public async Task<IActionResult> UpdateCarStatus(int id, [FromBody] Dictionary<string, string> b)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car != null)
            {
                car.CarStatus = b["newStatus"];
                await _context.SaveChangesAsync();
            }
            return Ok("Car status updated successfully");
        }

        [HttpPut("car/{carId}/delete")]
        public async Task<IActionResult> MarkCarDeleted(int carId)
        {
            await _context.Cars
                .Where(c => c.CarId == carId)
                .ExecuteUpdateAsync(s => s.SetProperty(c => c.CarStatus, "Deleted"));
            return Ok(new { message = "Car marked as deleted successfully" });
        }

        [HttpDelete("car/deleteAssociations/{carId}")]
        public async Task<IActionResult> DeleteAssoc(int carId)
        {
            var car = await _context.Cars.Include(x => x.Features).FirstOrDefaultAsync(x => x.CarId == carId);
            if (car != null)
            {
                car.Features.Clear();
                await _context.Feedbacks.Where(f => f.CarId == carId).ExecuteDeleteAsync();
                await _context.Rentals.Where(r => r.CarId == carId).ExecuteDeleteAsync();
                await _context.SaveChangesAsync();
            }
            return Ok(new { message = "Car associations deleted successfully" });
        }

        [HttpDelete("car/{carId}")]
        public async Task<IActionResult> DeleteFullCar(int carId)
        {
            var car = await _context.Cars.Include(x => x.Features).FirstOrDefaultAsync(x => x.CarId == carId);
            if (car != null)
            {
                car.Features.Clear();
                await _context.Feedbacks.Where(f => f.CarId == carId).ExecuteDeleteAsync();

                var rIds = await _context.Rentals.Where(r => r.CarId == carId).Select(r => r.RentalId).ToListAsync();
                if (rIds.Any())
                {
                    await _context.Payments.Where(p => p.RentalId.HasValue && rIds.Contains(p.RentalId.Value)).ExecuteDeleteAsync();
                }

                await _context.Rentals.Where(r => r.CarId == carId).ExecuteDeleteAsync();
                _context.Cars.Remove(car);
                await _context.SaveChangesAsync();
            }
            return Ok(new { message = "Car deleted successfully" });
        }

        [HttpPut("cars/{id}/approve")]
        public async Task<IActionResult> ApproveCar(int id, [FromBody] AdminActionDto dto)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car != null)
            {
                car.CarStatus = "Approved";
                _context.CarApprovalLogs.Add(new CarApprovalLog
                {
                    CarId = id,
                    AdminId = dto.AdminId,
                    ActionType = "Approved",
                    ActionDate = DateTime.Now
                });
                await _context.SaveChangesAsync();
            }
            return Ok("Car approved successfully and action logged.");
        }

        [HttpPut("cars/{id}/decline")]
        public async Task<IActionResult> DeclineCar(int id, [FromBody] AdminActionDto dto)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car != null)
            {
                car.CarStatus = "Declined";
                _context.CarApprovalLogs.Add(new CarApprovalLog
                {
                    CarId = id,
                    AdminId = dto.AdminId,
                    ActionType = "Declined",
                    ActionDate = DateTime.Now
                });
                await _context.SaveChangesAsync();
            }
            return Ok("Car declined successfully and action logged.");
        }

        [HttpGet("car-features/{carId}")]
        public async Task<IActionResult> GetCarFeatureIds(int carId)
        {
            var car = await _context.Cars.Include(x => x.Features).FirstOrDefaultAsync(x => x.CarId == carId);
            return Ok(car?.Features.Select(f => f.FeatureId) ?? Enumerable.Empty<int>());
        }


        [HttpPost("registerCar")]
        public async Task<IActionResult> RegisterCar([FromForm] RegisterCarDto dto)
        {
            if (dto.Image == null || dto.License == null)
            {
                return BadRequest(new { message = "Image and license are required" });
            }

            var imgFolder = Path.Combine(_env.ContentRootPath, "img");
            if (!Directory.Exists(imgFolder)) Directory.CreateDirectory(imgFolder);

            var licenseFolder = Path.Combine(_env.ContentRootPath, "license");
            if (!Directory.Exists(licenseFolder)) Directory.CreateDirectory(licenseFolder);

            string iName = $"{DateTime.Now.Ticks}_{dto.Image.FileName}";
            using (var s = new FileStream(Path.Combine(imgFolder, iName), FileMode.Create))
            {
                await dto.Image.CopyToAsync(s);
            }

            string lName = $"{DateTime.Now.Ticks}_{dto.License.FileName}";
            using (var s = new FileStream(Path.Combine(licenseFolder, lName), FileMode.Create))
            {
                await dto.License.CopyToAsync(s);
            }

            var reg = new RegisterCar
            {
                GarageId = dto.GarageID,
                CarName = dto.Name,
                Brand = dto.Brand,
                Price = dto.Price,
                CarType = dto.Type,
                Seats = dto.Seat,
                Gear = dto.Gear,
                Fuel = dto.Fuel,
                CarStatus = "Idle",
                CarImage = $"http://localhost:5000/img/{iName}",
                License = $"http://localhost:5000/license/{lName}",
                CarDescription = dto.Description
            };

            _context.RegisterCars.Add(reg);
            await _context.SaveChangesAsync();

            if (!string.IsNullOrEmpty(dto.Features))
            {
                var options = new JsonSerializerOptions { NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString };
                var fIds = JsonSerializer.Deserialize<List<int>>(dto.Features, options);

                if (fIds != null)
                {
                    reg.Features = await _context.Features.Where(f => fIds.Contains(f.FeatureId)).ToListAsync();
                }
                await _context.SaveChangesAsync();
            }
            return Ok(new { message = "Car registered successfully!" });
        }

        [HttpGet("register-cars")]
        public async Task<IActionResult> GetRegCars()
        {
            var list = await _context.RegisterCars.Select(c => new RegisterCarResponse
            {
                CarId = c.CarId,
                GarageId = c.GarageId,
                CarName = c.CarName,
                Brand = c.Brand,
                Price = c.Price,
                CarType = c.CarType,
                Seats = c.Seats,
                Gear = c.Gear,
                Fuel = c.Fuel,
                CarStatus = c.CarStatus,
                CarImage = c.CarImage,
                CarDescription = c.CarDescription,
                License = c.License
            }).ToListAsync();
            return Ok(list);
        }   

        [HttpGet("register-cars/{carId}/features")]
        public async Task<IActionResult> GetRegCarFeats(int carId)
        {
            var car = await _context.RegisterCars.Include(x => x.Features).FirstOrDefaultAsync(x => x.CarId == carId);
            return Ok(car?.Features.Select(f => new { f.Name }) ?? Enumerable.Empty<object>());
        }

        [HttpDelete("register-cars/{carId}/decline")]
        public async Task<IActionResult> DeclineRegCar(int carId)
        {
            var car = await _context.RegisterCars.Include(x => x.Features).FirstOrDefaultAsync(x => x.CarId == carId);
            if (car != null)
            {
                car.Features.Clear();
                _context.RegisterCars.Remove(car);
                await _context.SaveChangesAsync();
            }
            return Ok("Car declined successfully");
        }

        [HttpPost("register-cars/{carId}/approve")]
        public async Task<IActionResult> ApproveRegCar(int carId, [FromBody] AdminActionDto dto)
        {
            var reg = await _context.RegisterCars.Include(x => x.Features).FirstOrDefaultAsync(x => x.CarId == carId);
            if (reg == null) return NotFound("Car not found");

            var newCar = new Car
            {
                GarageId = reg.GarageId,
                CarName = reg.CarName,
                Brand = reg.Brand,
                Rate = reg.Rate,
                Price = reg.Price,
                CarType = reg.CarType,
                Seats = reg.Seats,
                Gear = reg.Gear,
                Fuel = reg.Fuel,
                CarStatus = "Closed",
                CarImage = reg.CarImage,
                CarDescription = reg.CarDescription
            };

            newCar.Features = reg.Features.ToList();
            _context.Cars.Add(newCar);

            reg.Features.Clear();
            _context.RegisterCars.Remove(reg);
            await _context.SaveChangesAsync();

            return Ok("Car approved successfully");
        }
    }
}