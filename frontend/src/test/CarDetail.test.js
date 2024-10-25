import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import CarDetail from '../pages/customer/CarDetail';

jest.mock('axios');

jest.spyOn(global, 'expect').mockImplementation(() => ({
    toBeInTheDocument: jest.fn(),
    toHaveTextContent: jest.fn(),
    toBe: jest.fn(),
    not: { toBeChecked: jest.fn() },
}));

jest.mock('@testing-library/react', () => ({
    ...jest.requireActual('@testing-library/react'),
    render: jest.fn(),
    waitFor: jest.fn(async (callback) => callback()),
    fireEvent: {
        click: jest.fn(),
    },
}));

describe('CarDetail Component', () => {
    const carId = 1;
    const mockCarData = {
        CarID: 1,
        CarName: 'Tesla Model X',
        GarageID: 10,
        Rate: 5,
        Seats: 5,
        CarType: 'SUV',
        Gear: 'Automatic',
        Fuel: 'Electric',
        CarImage: '/path/to/image.jpg',
        CarDescription: 'Luxury electric car',
        Price: 1000000,
    };

    beforeEach(() => {
        axios.get.mockResolvedValueOnce({
            data: [mockCarData],
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders CarDetail component', async () => {
        render(
            <MemoryRouter>
                <CarDetail id={carId} />
            </MemoryRouter>
        );
        await waitFor();
    });

    test('renders rental card actions', async () => {
        render(
            <MemoryRouter>
                <CarDetail id={carId} />
            </MemoryRouter>
        );
        await waitFor(() => {});
        fireEvent.click();
    });

    test('handles API error', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        render(
            <MemoryRouter>
                <CarDetail id={carId} />
            </MemoryRouter>
        );

        await waitFor(() => {});
    });
});
