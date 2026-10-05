using System;
using System.Collections.Generic;

namespace CarRentalAPI.Models;

public partial class Account
{
    public int Id { get; set; }

    public string UserName { get; set; } = null!;

    public string PassWord { get; set; } = null!;

    public bool Gender { get; set; }

    public int Role { get; set; }

    public DateOnly Dob { get; set; }

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Address { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<Bill> Bills { get; set; } = new List<Bill>();

    public virtual ICollection<CarApprovalLog> CarApprovalLogs { get; set; } = new List<CarApprovalLog>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<Garage> Garages { get; set; } = new List<Garage>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<Rental> Rentals { get; set; } = new List<Rental>();

    public virtual ICollection<Voucher> Vouchers { get; set; } = new List<Voucher>();
}
