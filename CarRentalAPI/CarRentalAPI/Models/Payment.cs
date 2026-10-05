using System;
using System.Collections.Generic;

namespace CarRentalAPI.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int? RentalId { get; set; }

    public DateOnly PaymentDate { get; set; }

    public virtual Rental? Rental { get; set; }
}
