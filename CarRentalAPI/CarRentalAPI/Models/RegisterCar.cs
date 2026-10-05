using System;
using System.Collections.Generic;

namespace CarRentalAPI.Models;

public partial class RegisterCar
{
    public int CarId { get; set; }

    public int? GarageId { get; set; }

    public string CarName { get; set; } = null!;

    public string Brand { get; set; } = null!;

    public int? Rate { get; set; }

    public int Price { get; set; }

    public string? CarType { get; set; }

    public int Seats { get; set; }

    public string? Gear { get; set; }

    public string? Fuel { get; set; }

    public string CarStatus { get; set; } = null!;

    public string? CarImage { get; set; }

    public string? CarDescription { get; set; }

    public string? License { get; set; }

    public virtual Garage? Garage { get; set; }

    public virtual ICollection<Feature> Features { get; set; } = new List<Feature>();
}
