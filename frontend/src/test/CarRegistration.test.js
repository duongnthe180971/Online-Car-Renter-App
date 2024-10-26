import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CarRegistration from '../pages/car/CarRegistration';
import '@testing-library/jest-dom'; 


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), 
  useParams: jest.fn(),
}));


beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url === 'http://localhost:5000/api/feature') {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            { FeatureID: 1, Name: 'Air Conditioning' },
            { FeatureID: 2, Name: 'Sunroof' },
          ]),
      });
    }
    if (url === 'http://localhost:5000/api/registerCar') {
      return Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
      });
    }
  });


  global.URL.createObjectURL = jest.fn(() => 'mocked-image-url');
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('CarRegistration Component', () => {
  beforeEach(() => {

    const { useParams, useNavigate } = require('react-router-dom');
    useParams.mockReturnValue({ garageID: '1' });


    useNavigate.mockReturnValue(jest.fn());


    fetch.mockClear();
  });

  test('renders form elements and allows user input', async () => {
    render(
      <Router>
        <CarRegistration />
      </Router>
    );


    await waitFor(() => expect(screen.getByLabelText(/Enter Name/i)).toBeInTheDocument());


    expect(screen.getByLabelText(/Enter Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose Brand/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose Picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Seats/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gear/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fuel/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();


    const nameInput = screen.getByLabelText(/Enter Name/i);
    fireEvent.change(nameInput, { target: { value: 'New Car Name' } });
    expect(nameInput.value).toBe('New Car Name');


    const brandSelect = screen.getByLabelText(/Choose Brand/i);
    fireEvent.change(brandSelect, { target: { value: 'Tesla' } });
    expect(brandSelect.value).toBe('Tesla');


    const fileInput = screen.getByLabelText(/Choose Picture/i);
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(fileInput.files[0]).toBe(file);


    const carTypeSelect = screen.getByLabelText(/Type/i);
    fireEvent.change(carTypeSelect, { target: { value: 'Sedan' } });
    expect(carTypeSelect.value).toBe('Sedan');


    const priceInput = screen.getByLabelText(/Price/i);
    fireEvent.change(priceInput, { target: { value: '5000' } });
    expect(priceInput.value).toBe('5000');


    await waitFor(() => screen.getByLabelText('Air Conditioning'));
    const featureCheckbox = screen.getByLabelText('Air Conditioning');
    fireEvent.click(featureCheckbox);
    expect(featureCheckbox.checked).toBe(true);


    const submitButton = screen.getByText(/Confirm/i);
    expect(submitButton).toBeInTheDocument();
  });

  test('submits form data correctly', async () => {
    render(
      <Router>
        <CarRegistration />
      </Router>
    );
  

    await waitFor(() => {
      expect(screen.getByLabelText(/Enter Name/i)).toBeInTheDocument();
    });
  

    await waitFor(() => {
      expect(screen.getByLabelText('Air Conditioning')).toBeInTheDocument();
    });
  

    const featureCheckbox = screen.getByLabelText('Air Conditioning');
    fireEvent.click(featureCheckbox);
    expect(featureCheckbox.checked).toBe(true);
  

    fireEvent.change(screen.getByLabelText(/Enter Name/i), { target: { value: 'My Car' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'This is a test car.' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '5000' } });
    fireEvent.change(screen.getByLabelText(/Choose Brand/i), { target: { value: 'Tesla' } });
    fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: 'SUV' } });
    fireEvent.change(screen.getByLabelText(/Seats/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/Gear/i), { target: { value: 'Auto' } });
    fireEvent.change(screen.getByLabelText(/Fuel/i), { target: { value: 'Gasoline' } });
  

    const submitButton = screen.getByText(/Confirm/i);
    fireEvent.click(submitButton);
  

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2); 
    });
  

    const formData = fetch.mock.calls[1][1].body;
  
    expect(formData.get('name')).toBe('My Car');
    expect(formData.get('description')).toBe('This is a test car.');
    expect(formData.get('price')).toBe('5000');
    expect(formData.get('brand')).toBe('Tesla');
    expect(formData.get('type')).toBe('SUV');
    expect(formData.get('seat')).toBe('5');
    expect(formData.get('gear')).toBe('Auto');
    expect(formData.get('fuel')).toBe('Gasoline');
  

    const selectedFeatures = JSON.parse(formData.get('features')).map(Number);
    expect(selectedFeatures).toEqual([1]);
  });
});
