using System;
using System.Collections.Generic;

namespace CarRentalAPI.Models;

public partial class Garage
{
    public int GarageId { get; set; }

    public int? CarOwnerId { get; set; }

    public virtual Account? CarOwner { get; set; }

    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();

    public virtual ICollection<RegisterCar> RegisterCars { get; set; } = new List<RegisterCar>();
}
