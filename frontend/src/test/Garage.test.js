import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Garage from '../pages/car_owner/Garage';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)
    return render(ui, { wrapper: BrowserRouter })
}

const mockCarData = [
    { CarID: 1, GarageID: 1, CarName: "Tesla Malibu", CarStatus: "Idle" },
    { CarID: 2, GarageID: 1, CarName: "Toyota Aventador", CarStatus: "Idle" },
];


const mockGarageData = [{ GarageID: 1 }];

describe('Garage Component', () => {
    beforeEach(() => {
        localStorage.setItem('user', JSON.stringify({ id: 4, role: 2 }));
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.removeItem('user');
    });

    //passed
    test('displays error if user has no permission', async () => {
        localStorage.setItem('user', JSON.stringify({ id: 1, role: 1 }));
        renderWithRouter(<Garage />);

        await waitFor(() => {
            const errorMessage = screen.getByText((content, element) => content.includes('No permission'));
            expect(errorMessage).toBeInTheDocument();
        });
    });

    //passed
    test('renders "Garage" heading without ambiguity', async () => {
        axios.get.mockResolvedValueOnce({ data: [{ GarageID: 1 }] });
        axios.get.mockResolvedValueOnce({ data: [] });
        
        renderWithRouter(<Garage />);
        
        await waitFor(() => {
            const garageHeading = screen.getAllByText('Garage');
            expect(garageHeading[1]).toBeInTheDocument();
        });
    });

    test('displays valid car data only for the chosen GarageID', async () => {
        // Set up axios mocks
        axios.get.mockImplementation((url) => {
            if (url.includes('/api/garage/')) {
                return Promise.resolve({ data: mockGarageData });
            }
            if (url.includes('/api/car')) {
                return Promise.resolve({ data: mockCarData });
            }
            return Promise.reject(new Error('not found'));
        });    
        renderWithRouter(<Garage />);    
        await waitFor(() => {
            expect(screen.getByText("Tesla Malibu")).toBeInTheDocument();
            expect(screen.getByText("Toyota Aventador")).toBeInTheDocument();
        });
    });
});
