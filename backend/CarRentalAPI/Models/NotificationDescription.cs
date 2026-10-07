using System;
using System.Collections.Generic;

namespace CarRentalAPI.Models;

public partial class NotificationDescription
{
    public int NotificationId { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}
