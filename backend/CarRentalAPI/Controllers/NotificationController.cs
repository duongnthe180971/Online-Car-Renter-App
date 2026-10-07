using CarRentalAPI.Models;
using CarRentalAPI.DTOs.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRentalAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly CarRentContext _context;

        public NotificationController(CarRentContext context)
        {
            _context = context;
        }

        [HttpGet("notification")]
        public async Task<IActionResult> GetNotifs()
        {
            return Ok(await _context.Notifications.ToListAsync());
        }

        [HttpGet("notification-description")]
        public async Task<IActionResult> GetNotifDescs()
        {
            return Ok(await _context.NotificationDescriptions.ToListAsync());
        }

        [HttpGet("notification/{AccID}")]
        public async Task<IActionResult> GetUserNotifs(int AccID)
        {
            var notifications = await _context.Notifications
                .Include(n => n.NotificationNavigation)
                .Where(n => n.AccId == AccID)
                .Select(n => new
                {
                    n.NotificationNavigation.Description,
                    n.NotificationDate
                })
                .ToListAsync();

            return Ok(notifications);
        }

        [HttpPost("notification")]
        public async Task<IActionResult> AddNotif([FromBody] CreateNotificationDto dto)
        {
            var notification = new Notification
            {
                AccId = dto.AccID,
                NotificationId = dto.NotificationID,
                NotificationDate = DateOnly.FromDateTime(DateTime.Now)
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            return StatusCode(201, new { message = "Notification added successfully" });
        }
    }
}