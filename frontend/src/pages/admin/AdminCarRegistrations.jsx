import React, { useState, useEffect } from "react";
import ChooseBar from "../../modules/components/ChooseBarAdmin";
import "../../styles/admin/AdminCarRegistrations.css";
import Loader from "../../modules/components/Loader";

const AdminCarRegistrations = () => {
  const [cars, setCars] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedCar, setSelectedCar] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 3;


  const [selectedBrand, setSelectedBrand] = useState(""); 
  const [selectedSeats, setSelectedSeats] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const adminId = 1; 

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/register-cars"); 
        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }
        const data = await response.json();
        setCars(data);
        setLoading(false); 
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesBrand = selectedBrand ? car.Brand === selectedBrand : true;
    const matchesSeats = selectedSeats
      ? car.Seats === parseInt(selectedSeats)
      : true;
    const matchesPrice =
      selectedPriceRange === "low"
        ? car.Price <= 300000
        : selectedPriceRange === "mid"
        ? car.Price > 300000 && car.Price <= 600000
        : selectedPriceRange === "high"
        ? car.Price > 600000
        : true;

    return matchesBrand && matchesSeats && matchesPrice;
  });

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApprove = async (carId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/register-cars/${carId}/approve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminId }),
        }
      );

      if (response.ok) {
        setCars(cars.filter((car) => car.CarID !== carId));
        alert("Car approved successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to approve car");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDecline = async (carId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/register-cars/${carId}/decline`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setCars(cars.filter((car) => car.CarID !== carId));
        alert("Car declined successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to decline car");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleViewInfo = async (car) => {
    setSelectedCar(car);
    try {
      const response = await fetch(
        `http://localhost:5000/api/register-cars/${car.CarID}/features`
      );
      const featureData = await response.json();
      setSelectedCar((prev) => ({ ...prev, features: featureData }));
    } catch (err) {
      alert("Failed to load features");
    }
  };


  const handleCloseInfo = () => {
    setSelectedCar(null);
  };

  const handleDownloadLicense = (licenseUrl) => {
    const link = document.createElement("a");
    link.href = licenseUrl;
    link.download = "license.pdf";
    link.click();
  };

  if (loading) return <Loader />;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="AllPage">
      <div className="LeftSide">
        <div className="Bar">
          <ChooseBar />
        </div>
      </div>
      <div className="RightSide">
        <div className="registration">
          <h1 className="page-registration">Car Registrations</h1>

          <div className="filter-container">
            <div className="filter-group">
              <label htmlFor="brand">Brand:</label>
              <select
                id="brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">All Brands</option>
                <option value="Tesla">Tesla</option>
                <option value="Toyota">Toyota</option>
                <option value="BMW">BMW</option>
                <option value="Nissan">Nissan</option>
                <option value="Ferrari">Ferrari</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Audi">Audi</option>
                <option value="Lamborghini">Lamborghini</option>
                <option value="Bugatti">Bugatti</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="seats">Seats:</label>
              <select
                id="seats"
                value={selectedSeats}
                onChange={(e) => setSelectedSeats(e.target.value)}
              >
                <option value="">All</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="price">Price Range:</label>
              <select
                id="price"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option value="">All</option>
                <option value="low">0 - 300,000</option>
                <option value="mid">300,001 - 600,000</option>
                <option value="high">600,001 and above</option>
              </select>
            </div>
          </div>

          {filteredCars.length === 0 ? (
            <div className="no-registrations">
              <p>No cars match the selected criteria.</p>
            </div>
          ) : (
            <>
              <div className="car-registration-list">
                {currentCars.map((car) => (
                  <CarCard
                    key={car.CarID}
                    car={car}
                    onApprove={() => handleApprove(car.CarID)}
                    onDecline={() => handleDecline(car.CarID)}
                    onViewInfo={() => handleViewInfo(car)}
                  />
                ))}
              </div>

              <Pagination
                carsPerPage={carsPerPage}
                totalCars={filteredCars.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}

          {selectedCar && (
            <div className="car-details-modal">
              <div className="car-details-content">
                <button className="close-modal-btn" onClick={handleCloseInfo}>
                  Close
                </button>
                <div className="car-details-left">
                  <img src={selectedCar.CarImage} alt={selectedCar.CarName} />
                </div>
                <div className="car-details-right">
                  <h2>{selectedCar.CarName}</h2>
                  <p>
                    <strong>Brand:</strong> {selectedCar.Brand}
                  </p>
                  <p>
                    <strong>Price:</strong> ${selectedCar.Price}
                  </p>
                  <p>
                    <strong>Seats:</strong> {selectedCar.Seats}
                  </p>
                  <p>
                    <strong>Fuel:</strong> {selectedCar.Fuel}
                  </p>
                  <p>
                    <strong>Type:</strong> {selectedCar.CarType}
                  </p>
                  <p>
                    <strong>Gear:</strong> {selectedCar.Gear}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedCar.CarDescription}
                  </p>
                  <p>
                    <strong>Features:</strong>{" "}
                    {selectedCar.features &&
                      selectedCar.features
                        .map((feature) => feature.Name)
                        .join(", ")}
                  </p>
                  <button
                    onClick={() => handleDownloadLicense(selectedCar.License)}
                  >
                    Download License
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ carsPerPage, totalCars, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCars / carsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="page-link"
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className={`page-link ${currentPage === number ? "active" : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === pageNumbers.length ? "disabled" : ""
          }`}
        >
          <button
            onClick={() => paginate(currentPage + 1)}
            className="page-link"
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

const CarCard = ({ car, onApprove, onDecline, onViewInfo }) => {
  const handleImageError = (e) => {
    e.target.src = "/img/default-car.png";
  };

  return (
    <div className="car-card">
      <img
        src={car.CarImage}
        alt={car.CarName}
        className="car-image"
        onError={handleImageError}
      />
      <div className="car-info">
        <h2>{car.CarName}</h2>
        <div className="car-actions">
          <button className="view-info-btn" onClick={onViewInfo}>
            View Info
          </button>
          <button className="approve-btn" onClick={onApprove}>
            Approve
          </button>
          <button className="decline-btn" onClick={onDecline}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCarRegistrations;
