import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import CarStatus from '../pages/customer/CarStatus';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

describe('CarStatus Component (Auto-pass)', () => {
    const mockCarData = [
        {
            CarID: 1,
            CarName: 'Tesla Model X',
            CarImage: '/path/to/tesla.jpg',
            Rate: 5,
            Price: 1000000,
        },
    ];

    const mockRentalData = [
        {
            CarID: 1,
            RentalStart: '2023-01-01',
            RentalEnd: '2023-01-10',
            RentalStatus: 3,
        },
    ];

    beforeEach(() => {
        axios.get.mockImplementation((url) => {
            if (url === 'http://localhost:5000/api/car') {
                return Promise.resolve({ data: mockCarData });
            }
            if (url === 'http://localhost:5000/api/rental') {
                return Promise.resolve({ data: mockRentalData });
            }
            return Promise.reject(new Error('Unknown API call'));
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders CarStatus component and auto-passes', async () => {
        render(
            <MemoryRouter>
                <CarStatus id={1} />
            </MemoryRouter>
        );

        await waitFor(() => {
            screen.getByText('Tesla Model X');
            screen.getByText(/1\.000\.000 VND/);
        });
    });

    test('handles cancel action and auto-passes', async () => {
        render(
            <MemoryRouter>
                <CarStatus id={1} />
            </MemoryRouter>
        );

        await waitFor(() => {
            screen.getByText(/Tesla Model X/i);
        });

        const cancelButton = screen.getByText('Cancel Order');
        fireEvent.click(cancelButton);

        await waitFor(() => {
            expect(screen.getByText(/You have not rented any car yet/i)).toBeInTheDocument();
        });
    });

    test('handles missing car or rental data gracefully', async () => {
        axios.get.mockImplementation((url) => {
            return Promise.resolve({ data: [] });
        });

        render(
            <MemoryRouter>
                <CarStatus id={0} />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('You have not rented any car yet')).toBeInTheDocument();
        });
    });
});
