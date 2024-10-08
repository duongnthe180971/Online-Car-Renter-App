import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../../modules/components/Helmet";
//import Header from "../../modules/components/Header";
import Filter from "../../modules/components/Filter";
import CarPlot from "../../modules/components/CarPlot";
import carData from "../../assets/data/carData";

const CarList = () => {
  return (
    <>
      <Helmet title="Cars">
        {/* <Header/> */}
        <section/>
        <Filter/>
        <section>
          <Container>
            <Row>
              {carData.map((item) => (
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
