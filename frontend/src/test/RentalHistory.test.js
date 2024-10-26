import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import RentalHistory from '../pages/car_owner/RentalHistory';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

const mockRentalData = [
  {
    RentalID: 1,
    CarID: 1,
    CustomerID: 2,
    RentalStatus: 1,
    RentalStart: "2024-10-21T00:00:00.000Z",
    RentalEnd: "2024-10-25T00:00:00.000Z"
  }
];

const mockCarData = [
  {
    CarID: 1,
    GarageID: 1,
    CarName: "Tesla Malibu",
    Price: 400000,
  }
];

const mockAccountData = [
  {
    id: 2,
    UserName: "customer1"
  }
];

const formatPrice = (price) => price.toLocaleString();
const formatDate_String = (dateString) => new Date(dateString).toLocaleDateString();

describe('RentalHistory component', () => {

  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url === "http://localhost:5000/api/rental") {
        return Promise.resolve({ data: mockRentalData });
      } else if (url === "http://localhost:5000/api/car") {
        return Promise.resolve({ data: mockCarData });
      } else if (url === "http://localhost:5000/api/account") {
        return Promise.resolve({ data: mockAccountData });
      }
    });
  });

  test('renders rental history for the correct garage', async () => {

    render(
        <Router>
          <RentalHistory garageID={1} />
        </Router>
      );
    await waitFor(() => {
        expect(screen.getByText(/Tesla Malibu/i)).toBeInTheDocument();

        expect(screen.getByText(/400.000 VND/i)).toBeInTheDocument();

        expect(screen.getByText(/customer1/i)).toBeInTheDocument();

        const dates = screen.getAllByText(/21\/10\/2024/i);
        expect(dates.length).toBe(2);
        
        expect(screen.getByText(/Renting/i)).toBeInTheDocument();
      });
      
      
  });
});
