using System;
using System.Collections.Generic;

namespace CarRentalAPI.Models;

public partial class CarApprovalLog
{
    public int LogId { get; set; }

    public int? CarId { get; set; }

    public int? AdminId { get; set; }

    public string? ActionType { get; set; }

    public DateTime? ActionDate { get; set; }

    public virtual Account? Admin { get; set; }

    public virtual Car? Car { get; set; }
}
