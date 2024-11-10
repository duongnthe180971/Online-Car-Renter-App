import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomerMap from '../pages/customer/CustomerMap';

jest.mock('react-leaflet', () => ({
    MapContainer: jest.fn(({ children }) => <div data-testid="mock-map">{children}</div>),
    TileLayer: jest.fn(() => <div data-testid="mock-tile-layer" />),
    Marker: jest.fn(({ position, children }) => (
        <div data-testid={`mock-marker-${position[0]}-${position[1]}`}>{children}</div>
    )),
    Popup: jest.fn(({ children }) => <div data-testid="mock-popup">{children}</div>),
    useMap: jest.fn(() => ({
        removeControl: jest.fn(),
        addControl: jest.fn(),
    })),
}));

// Always mock fetch to return mock data or simulate failure
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve([
                {
                    lat: '21.0285',
                    lon: '105.8542',
                    display_name: 'Dai Hoc FPT Ha Noi',
                },
                {
                    lat: '21.0286',
                    lon: '105.8543',
                    display_name: 'Ho Hoan Kiem',
                },
            ]),
    })
);

const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

describe('CustomerMap Component', () => {

    test('Cập nhật địa chỉ khi nhập vào ô input', () => {
        const mockLocation = {
            state: {
                fromName: 'Dai Hoc FPT Ha Noi',
                toName: 'Ho Hoan Kiem',
            },
        };

        render(
            <Router location={mockLocation}>
                <CustomerMap />
            </Router>
        );

        const fromInput = screen.getByLabelText('Your Location:');
        const toInput = screen.getByLabelText('Destination:');

        fireEvent.change(fromInput, { target: { value: 'New From Location' } });
        fireEvent.change(toInput, { target: { value: 'New To Location' } });

        expect(fromInput.value).toBe('New From Location');
        expect(toInput.value).toBe('New To Location');
    });

    test('Hiển thị thông báo lỗi khi không tìm thấy địa chỉ', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([]), // Returning an empty array to simulate not found
            })
        );

        const mockLocation = {
            state: {
                fromName: 'Dai Hoc FPT Ha Noi',
                toName: 'Ho Hoan Kiem',
            },
        };

        render(
            <Router location={mockLocation}>
                <CustomerMap />
            </Router>
        );

        const showWayButton = screen.getByText('Show Way');
        fireEvent.click(showWayButton);

        await waitFor(() => {
            const errorMessage = screen.getByText('One or both locations were not found. Please check the inputs.');
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
