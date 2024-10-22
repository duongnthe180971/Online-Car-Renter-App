import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../../modules/components/Helmet";
//import Header from "../../modules/components/Header";
import Filter from "../../modules/components/Filter";
import CarPlot from "../../modules/components/CarPlot";
import carDemo from "../../assets/data/carDemo";

const CarList = () => {
  const defaultFilters =
  {
    type: "",
    gear: "",
    brand: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  }
  const [filters, setFilters] = useState(defaultFilters);
  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };
  const handleFilterRemove = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...defaultFilters,
    }));
  };
  const [cars, setCars] = useState(carDemo)
  useEffect(() => {
    const fetchCarData = async () => {
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
    };

    fetchCarData();
  }, []);

  const filteredData = cars.filter((car) => {
    const matchesType = filters.type === "" || car.CarType === filters.type;
    const matchesGear = filters.gear === "" || car.Gear === filters.gear;
    const matchesBrand = filters.brand === "" || car.Brand === filters.brand;
    const matchesLocation = filters.location === "" || car.address.split(",")[1].trim() === filters.location;
    const matchesMinPrice = !filters.minPrice || car.Price >= parseFloat(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || car.Price <= parseFloat(filters.maxPrice);

    return matchesType && matchesGear && matchesBrand && matchesLocation && matchesMinPrice && matchesMaxPrice;
  });
  return (
    <>
      <Helmet title="Cars">
        {/* <Header/> */}
        <section />
        <Filter onFilterChange={handleFilterChange} onFilterRemove={handleFilterRemove} />
        <section>
          <Container>
            <Row>
              {
                filteredData.map((item) => (
                  <Col md="3" sm="6" xs="12" key={item.id}>
                    <CarPlot item={item} />
                  </Col>
                ))}
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default CarList;
