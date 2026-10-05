using System;
using System.Collections.Generic;

namespace CarRentalAPI.Models;

public partial class Feature
{
    public int FeatureId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();

    public virtual ICollection<RegisterCar> CarsNavigation { get; set; } = new List<RegisterCar>();
}
