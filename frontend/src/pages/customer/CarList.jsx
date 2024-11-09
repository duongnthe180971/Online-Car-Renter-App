import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import HomeHeader from "../../modules/components/HomeHeader";
import Filter from "../../modules/components/Filter";
import CarPlot from "../../modules/components/CarPlot";
import carDemo from "../../assets/data/carDemo";

const CarList = () => {
  const [error, setError] = useState("");
  const defaultFilters = {
    type: "",
    gear: "",
    brand: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  };
  const [filters, setFilters] = useState(defaultFilters);

  const validateFilter = (newFilters) => {
    let errorMessage = "";

    const isPositiveInteger = (value) => {
      return /^\d+$/.test(value);
    };

    if (newFilters.minPrice !== undefined && newFilters.minPrice !== "" && !isPositiveInteger(newFilters.minPrice)) {
      errorMessage = "Min price must be a positive integer.";
    }

    if (newFilters.maxPrice !== undefined && newFilters.maxPrice !== "" && !isPositiveInteger(newFilters.maxPrice)) {
      errorMessage = "Max price must be a positive integer.";
    }

    setError(errorMessage);
    return !errorMessage;
  };

  const handleFilterChange = (newFilters) => {
    if (validateFilter(newFilters)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        ...newFilters,
      }));
    }
  };

  const handleFilterRemove = () => {
    setFilters(defaultFilters);
    setError("");
  };

  const [cars, setCars] = useState(carDemo);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/car");
        const carsWithAddress = await Promise.all(
          response.data.map(async (car) => {
            const resGarage = await axios.get("http://localhost:5000/api/garage");
            const garage = resGarage.data.find((item) => item.GarageID === car.GarageID);
            const accID = garage.CarOwnerID;
            const resAccount = await axios.get("http://localhost:5000/api/account");
            const account = resAccount.data.find((item) => item.id === accID);
            car.address = account.Address;
            return car;
          })
        );
        setCars(carsWithAddress);
      } catch (error) {
        setError("Unable to fetch data from the server. Please try again later.");
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, []);

  const filteredData = cars.filter((car) => {
    const isAvailable = car.CarStatus === "Idle";
    const matchesType = filters.type === "" || car.CarType === filters.type;
    const matchesGear = filters.gear === "" || car.Gear === filters.gear;
    const matchesBrand = filters.brand === "" || car.Brand === filters.brand;
    const matchesLocation = filters.location === "" || car.address.split(",")[1].trim() === filters.location;
    const matchesMinPrice = !filters.minPrice || car.Price >= parseFloat(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || car.Price <= parseFloat(filters.maxPrice);

    return isAvailable && matchesType && matchesGear && matchesBrand && matchesLocation && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div>
    <HomeHeader/>
        <section />
        <Filter onFilterChange={handleFilterChange} onFilterRemove={handleFilterRemove} />
        {error && <p className="error-message" style={{marginLeft: 5 + 'em'}}>{error}</p>}
        <section>
          <Container>
            <Row>
              {filteredData.map((item) => (
                <Col md="3" sm="6" xs="12" key={item.id}>
                  <CarPlot item={item}/>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
    </div>
  );
};

export default CarList;
