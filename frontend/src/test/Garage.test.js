import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for additional matchers
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom'; // wrap Router for navigate
import Garage from '../pages/car_owner/Garage';
import mockCarsData from './mockCarsData.js'; // Mocked car data

jest.mock('axios');

describe('Garage Component', () => {
    const garageID = 1;

    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: mockCarsData
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders Garage component and fetches car data', async () => {
        render(
            <Router>
                <Garage garageID={garageID} />
            </Router>
        );

        // Wait for the cars to load
        await waitFor(() => {
            mockCarsData
                .filter(car => car.GarageID === garageID)
                .forEach(car => {
                    expect(screen.getByText(car.CarName)).toBeInTheDocument();
                });
        });
    });

    test('handles status change correctly', async () => {
        render(
            <Router>
                <Garage garageID={garageID} />
            </Router>
        );

        // Wait for the cars to load
        await waitFor(() => {
            const carNames = mockCarsData
                .filter(car => car.GarageID === garageID)
                .map(car => car.CarName);

            carNames.forEach(name => {
                expect(screen.getByText(name)).toBeInTheDocument();
            });
        });

        // Find the first toggle switch for the car
        const toggle = screen.getAllByRole('checkbox')[0];
        fireEvent.click(toggle); // Simulate status toggle

        // Expect that the checkbox is toggled (checked/unchecked)
        expect(toggle.checked).toBe(false); // Example: if initially checked
    });

    test('navigates to car registration page when "Add New Car" is clicked', () => {
        render(
            <Router>
                <Garage garageID={garageID} />
            </Router>
        );

        const addCarButton = screen.getByText('Add New Car');
        fireEvent.click(addCarButton);

        // Check if the URL changes (simulate navigation)
        expect(window.location.pathname).toBe(`/car-registration/${garageID}`);
    });

    test('handles errors when fetching data', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network error'));

        render(
            <Router>
                <Garage garageID={garageID} />
            </Router>
        );

        // Ensure that error is handled (e.g., could display an error message)
        await waitFor(() => {
            expect(screen.getByText('Server error')).toBeInTheDocument();
        });
    });
});
