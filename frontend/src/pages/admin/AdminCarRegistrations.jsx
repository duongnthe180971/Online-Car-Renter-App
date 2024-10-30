import React, { useState, useEffect } from "react";
import ChooseBar from "../../modules/components/ChooseBarAdmin";
import "../../styles/admin/AdminCarRegistrations.css";

// AdminCarRegistrations Component
const AdminCarRegistrations = () => {
  const [cars, setCars] = useState([]); // State to hold car data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [selectedCar, setSelectedCar] = useState(null); // State for the selected car object
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const carsPerPage = 3; // Number of cars per page

  // Filter states
  const [selectedBrand, setSelectedBrand] = useState(""); // State for selected brand
  const [selectedSeats, setSelectedSeats] = useState(""); // State for selected number of seats
  const [selectedPriceRange, setSelectedPriceRange] = useState(""); // State for selected price range

  const adminId = 1; // Placeholder: Use actual admin ID from your authentication logic

  // Fetch car data from the backend API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/register-cars"); // Fetch only pending cars
        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }
        const data = await response.json();
        setCars(data); // Store car data in state
        setLoading(false); // Turn off loading spinner
      } catch (err) {
        setError(err.message); // Handle error
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Filtered Cars based on selected filters
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

  // Get the current cars based on the currentPage
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle car approval
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
        setCars(cars.filter((car) => car.CarID !== carId)); // Remove car from state
        alert("Car approved successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to approve car");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Function to handle car decline
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
        setCars(cars.filter((car) => car.CarID !== carId)); // Remove the car from state if successful
        alert("Car declined successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to decline car");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Function to handle viewing car details
  const handleViewInfo = async (car) => {
    setSelectedCar(car); // Set the selected car object in state
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

  // Function to close the detailed view
  const handleCloseInfo = () => {
    setSelectedCar(null); // Close the detailed view
  };

  // Function to download license file
  const handleDownloadLicense = (licenseUrl) => {
    const link = document.createElement("a");
    link.href = licenseUrl;
    link.download = "license.pdf";
    link.click();
  };

  // Display a loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error if there's a problem fetching the data
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
        <div className="adm-car-registration-container">
          <h1 className="page-title">Car Registrations</h1>

          {/* Filter Section */}
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

          {/* If no cars match the search filters */}
          {filteredCars.length === 0 ? (
            <div className="no-registrations">
              <p>No cars match the selected criteria.</p>
            </div>
          ) : (
            <>
              {/* Car List */}
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

              {/* Pagination Component */}
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

// Pagination Component with Next and Previous
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
          className={`page-item ${currentPage === pageNumbers.length ? "disabled" : ""
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

// CarCard Component
const CarCard = ({ car, onApprove, onDecline, onViewInfo }) => {
  const handleImageError = (e) => {
    e.target.src = "/img/default-car.png"; // Fallback image if the actual image is missing
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
