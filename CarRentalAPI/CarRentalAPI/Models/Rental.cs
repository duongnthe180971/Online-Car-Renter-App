using System;
using System.Collections.Generic;

namespace CarRentalAPI.Models;

public partial class Rental
{
    public int RentalId { get; set; }

    public int? CarId { get; set; }

    public int? CustomerId { get; set; }

    public int RentalStatus { get; set; }

    public DateOnly? RentalStart { get; set; }

    public DateOnly? RentalEnd { get; set; }

    public virtual Car? Car { get; set; }

    public virtual Account? Customer { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
