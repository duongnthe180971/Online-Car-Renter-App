using System;
using System.Collections.Generic;

namespace CarRentalAPI.Models;

public partial class Bill
{
    public int FinanceId { get; set; }

    public int? AccId { get; set; }

    public DateOnly Date { get; set; }

    public int TotalMoney { get; set; }

    public virtual Account? Acc { get; set; }
}
