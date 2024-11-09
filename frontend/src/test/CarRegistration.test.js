import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CarRegistration from '../pages/car/CarRegistration';
import '@testing-library/jest-dom'; 

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock fetch
global.fetch = jest.fn();

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');

describe('CarRegistration Component', () => {
beforeEach(() => {
  // Set a mock user in localStorage
    window.localStorage.setItem(
      'user',
      JSON.stringify({ role: 2, id: 1, username: 'testuser' })
    );

    // Mock API responses
fetch.mockImplementation((url) => {
    if (url.includes('/api/feature')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            { FeatureID: 1, Name: 'Feature 1' },
            { FeatureID: 2, Name: 'Feature 2' },
          ]),
      });
    } else     if (url.includes('/api/options')) {
      return Promise.resolve({
        json: () =>
            Promise.resolve({
              carTypes: ['SUV', 'Sedan'],
              seatOptions: ['2', '4'],
              gearOptions: ['Auto', 'Manual'],
              fuelOptions: ['Gasoline', 'Diesel'],
              brandOptions: ['Toyota', 'Tesla'],
            }),
      });
    }
  return Promise.resolve({ json: () => Promise.resolve([]) });
    });
});

afterEach(() => {
      fetch.mockClear();
localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders the Car Registration form', async () => {
    render(
      <Router>
        <CarRegistration />
      </Router>
    );

expect(await screen.findByText('Car Registration')).toBeInTheDocument();
    expect(screen.getByLabelText('Enter Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Choose Brand')).toBeInTheDocument();
    expect(screen.getByLabelText('Choose Picture')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload License')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  test('handles image upload and displays preview', async () => {
    render(
      <Router>
        <CarRegistration />
      </Router>
    );
  
const file = new File(['image content'], 'example.png', { type: 'image/png' });

    const input = await screen.findByLabelText('Choose Picture');
    fireEvent.change(input, { target: { files: [file] } });
  
console.log(screen.debug()); // Inspect the DOM to ensure the <img> is rendered

    await waitFor(() => {
      expect(screen.getByAltText('Selected')).toBeInTheDocument();
    expect(screen.getByAltText('Selected')).toHaveAttribute('src', 'mock-url');
    });
  });

  test('handles license upload and displays file name', async () => {
    render(
      <Router>
        <CarRegistration />
      </Router>
    );

    const file = new File(['license content'], 'example.pdf', { type: 'application/pdf' });

    const input = await screen.findByLabelText('Upload License');
    fireEvent.change(input, { target: { files: [file] } });
  
    await waitFor(() => {
      expect(screen.getByText('example.pdf')).toBeInTheDocument(); 
    });
  });

  test('fetches and displays dropdown options', async () => {
    render(
      <Router>
        <CarRegistration />
      </Router>
    );

    const brandDropdown = await screen.findByLabelText('Choose Brand');
    fireEvent.click(brandDropdown);

    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThan(1); // Assumes options are dynamically populated
  });
});
