using System;
using System.Collections.Generic;

namespace CarRentalAPI.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int? CarId { get; set; }

    public int? CustomerId { get; set; }

    public string? FeedbackDescription { get; set; }

    public DateOnly FeedbackDate { get; set; }

    public int? Rate { get; set; }

    public virtual Car? Car { get; set; }

    public virtual Account? Customer { get; set; }
}
