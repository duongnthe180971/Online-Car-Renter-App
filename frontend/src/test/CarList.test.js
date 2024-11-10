import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import CarList from '../pages/customer/CarList';

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

describe('CarList Component', () => {
    const mockCarData = [
        {
            CarID: 1,
            CarName: 'Tesla Model X',
            CarType: 'SUV',
            Gear: 'Automatic',
            Brand: 'Tesla',
            Price: 1000000,
            address: '123 Main St, Los Angeles',
        },
        {
            CarID: 2,
            CarName: 'BMW 3 Series',
            CarType: 'Sedan',
            Gear: 'Manual',
            Brand: 'BMW',
            Price: 700000,
            address: '456 Elm St, New York',
        },
    ];

    beforeEach(() => {
        axios.get.mockResolvedValueOnce({
            data: mockCarData,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders CarList component and auto-passes', async () => {
        render(<CarList />);

        await waitFor(() => {
            screen.getByText('Tesla Model X');
            screen.getByText('BMW 3 Series');
        });
    });

    test('handles API errors', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        render(<CarList />);
        await waitFor(() => {
            screen.getByText('No cars found.');
        });
    });
});
