import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import UpdateCar from '../pages/car/UpdateCar';

jest.mock('axios');


beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'mocked-url');
  global.console.error = jest.fn(); 
  window.alert = jest.fn();
});

const mockCarDetails = {
  CarName: 'Test Car',
  CarDescription: 'A nice car',
  Price: 100000, 
  CarImage: 'http://localhost:5000/img/test-car.jpg',
  CarType: 'SUV',
  Seats: 5,
  Gear: 'Auto',
  Fuel: 'Gasoline',
  Brand: 'Toyota',
};

const mockFeatures = [
  { FeatureID: 1, Name: 'GPS' },
  { FeatureID: 2, Name: 'Air Conditioning' },
];

const mockCarFeatureIDs = [1];

describe('UpdateCar Component', () => {
  beforeEach(async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes('/api/car/')) {
        return Promise.resolve({ data: mockCarDetails });
      } else if (url.includes('/api/car-features/')) {
        return Promise.resolve({ data: mockCarFeatureIDs });
      } else if (url.includes('/api/feature')) {
        return Promise.resolve({ data: mockFeatures });
      }
    });

    render(
      <BrowserRouter>
        <UpdateCar />
      </BrowserRouter>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders UpdateCar form with initial values', () => {
    expect(screen.getByLabelText(/Enter Name/i)).toHaveValue(mockCarDetails.CarName);
    expect(screen.getByLabelText(/Description/i)).toHaveValue(mockCarDetails.CarDescription);
    expect(screen.getByLabelText(/Price/i)).toHaveValue(mockCarDetails.Price); 
    expect(screen.getByLabelText(/Type:/i)).toHaveValue(mockCarDetails.CarType);
    expect(screen.getByLabelText(/Seats:/i)).toHaveValue(mockCarDetails.Seats.toString());
    expect(screen.getByLabelText(/Gear:/i)).toHaveValue(mockCarDetails.Gear);
    expect(screen.getByLabelText(/Fuel:/i)).toHaveValue(mockCarDetails.Fuel);
    expect(screen.getByAltText('Current')).toHaveAttribute('src', mockCarDetails.CarImage);
  });

  test('allows feature selection to be toggled', () => {
    const gpsCheckbox = screen.getByLabelText('GPS');
    const airConditioningCheckbox = screen.getByLabelText('Air Conditioning');

    fireEvent.click(gpsCheckbox);
    expect(gpsCheckbox).not.toBeChecked();

    fireEvent.click(airConditioningCheckbox);
    expect(airConditioningCheckbox).toBeChecked();
  });

  test('handles form submission', async () => {
    const submitButton = screen.getByText(/Confirm/i);
    axios.put.mockResolvedValueOnce({});

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
    });

    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining('/api/updateCar/'),
      expect.any(FormData),
      expect.objectContaining({
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );
  });

  test('handles form submission failure gracefully', async () => {
    const submitButton = screen.getByText(/Confirm/i);
  

    axios.put.mockRejectedValueOnce({ response: { data: { message: 'Error updating car' } } });
  

    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
    });
  });
});
