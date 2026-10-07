using System;
using System.Collections.Generic;

namespace CarRentalAPI.Models;

public partial class Notification
{
    public int Id { get; set; }

    public int? AccId { get; set; }

    public int? NotificationId { get; set; }

    public DateOnly? NotificationDate { get; set; }

    public virtual Account? Acc { get; set; }

    public virtual NotificationDescription? NotificationNavigation { get; set; }
}
