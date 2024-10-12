import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../../modules/components/Helmet";
//import Header from "../../modules/components/Header";
import Filter from "../../modules/components/Filter";
import CarPlot from "../../modules/components/CarPlot";
import carData from "../../assets/data/carData";

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

  const filteredData = carData.filter((car) => {
    const matchesType = filters.type === "" || car.type === filters.type;
    const matchesGear = filters.gear === "" || car.gear === filters.gear;
    const matchesBrand = filters.brand === "" || car.brand === filters.brand;
    const matchesLocation = filters.location === "" || car.address.split(",")[1].trim() === filters.location;
    const matchesMinPrice = !filters.minPrice || car.price >= parseFloat(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || car.price <= parseFloat(filters.maxPrice);

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
