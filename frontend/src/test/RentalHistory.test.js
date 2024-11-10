import { render, screen, waitFor } from '@testing-library/react';
import RentalHistory from '../pages/car_owner/RentalHistory'; // Import your RentalHistory component
import { formatPrice, formatDate_String } from "../assets/format/numberFormat";
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import '@testing-library/jest-dom';

// Mock the format functions
jest.mock("../assets/format/numberFormat", () => ({
  formatPrice: jest.fn().mockImplementation((price) => `${price} VND`),
  formatDate_String: jest.fn().mockImplementation((date) => new Date(date).toLocaleDateString())
}));

describe('RentalHistory Component', () => {

  const mockRentalData = [
    {
      "RentalID": 1,
      "CarID": 1,
      "CustomerID": 2,
      "RentalStatus": 2,
      "RentalStart": "2024-10-21T00:00:00.000Z",
      "RentalEnd": "2024-10-25T00:00:00.000Z"
    },
    {
      "RentalID": 2,
      "CarID": 2,
      "CustomerID": 2,
      "RentalStatus": 2,
      "RentalStart": "2024-09-12T00:00:00.000Z",
      "RentalEnd": "2024-09-15T00:00:00.000Z"
    },
    {
      "RentalID": 3,
      "CarID": 3,
      "CustomerID": 2,
      "RentalStatus": 2,
      "RentalStart": "2024-10-07T00:00:00.000Z",
      "RentalEnd": "2024-10-12T00:00:00.000Z"
    }
  ];

  const mockCarData = [
    {
      "CarID": 1,
      "GarageID": 1,
      "CarName": "Tesla Malibu",
      "Price": 400000
    },
    {
      "CarID": 2,
      "GarageID": 1,
      "CarName": "Toyota Aventador",
      "Price": 500000
    },
    {
      "CarID": 3,
      "GarageID": 1,
      "CarName": "BMW X3",
      "Price": 300000
    }
  ];

  const mockCustomerData = [
    { "id": 4, "role" : 2 }
  ];

  test('displays rental history with car details correctly', async () => {
    // Simulate a user role that is authorized and mock the data if necessary
    localStorage.setItem("user", JSON.stringify({ id: 4, role: 2 }));
  
    // Mock the data required by the component (optional)
    const mockRentalData = [
      {
        RentalID: 1,
        CarID: 1,
        CustomerID: 2,
        RentalStatus: 2,
        RentalStart: '2024-10-21T00:00:00.000Z',
        RentalEnd: '2024-10-25T00:00:00.000Z',
      },
    ];
  
    const mockCarData = [
      {
        CarID: 1,
        GarageID: 1,
        CarName: "Tesla Malibu",
        Brand: "Tesla",
        Rate: 4,
        Price: 400000,
        CarType: "SUV",
        Seats: 4,
        Gear: "Auto",
        Fuel: "Electric",
        CarStatus: "Closed",
        CarImage: "../img/car/nissan-offer.png",
        CarDescription: "A cutting-edge electric SUV that combines Tesla's innovative technology with modern design, offering a comfortable ride for up to 4 passengers."
      }
    ];
  
    render(
      <MemoryRouter>
        <RentalHistory rentalData={mockRentalData} carData={mockCarData} />
      </MemoryRouter>
    );
  
    // Wait for the rental history and car details to be rendered
    await waitFor(() => screen.findByText(/Tesla Malibu/i));
  
    // Check if the car name appears in the document (using regex for flexibility)
    expect(screen.getByText(/Tesla Malibu/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Renting/i)[1]).toBeInTheDocument();
  });

  test('displays error message for unauthorized users', async () => {
    // Simulate a user with a non-permitted role (role: 3)
    localStorage.setItem("user", JSON.stringify({ id: 1, role: 3 }));
  
    render(
      <MemoryRouter>
        <RentalHistory rentalData={mockRentalData} carData={mockCarData} customerData={mockCustomerData} />
      </MemoryRouter>
    );
  
    // Wait for the error message to be rendered
    const errorMessage = await screen.findByText(/No permission for current feauture/i);
  
    // Check if the error message is rendered correctly
    expect(errorMessage).toBeInTheDocument();
  });
});