using System;
using System.Collections.Generic;

namespace CarRentalAPI.Models;

public partial class Voucher
{
    public int VoucherId { get; set; }

    public string VoucherCode { get; set; } = null!;

    public decimal DiscountAmount { get; set; }

    public bool? IsClaimed { get; set; }

    public int? ClaimedBy { get; set; }

    public string? Image { get; set; }

    public virtual Account? ClaimedByNavigation { get; set; }
}
