import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerMap from '../pages/customer/CustomerMap';

jest.mock('react-leaflet', () => ({
    MapContainer: jest.fn(({ children }) => <div data-testid="mock-map">{children}</div>),
    TileLayer: jest.fn(() => <div data-testid="mock-tile-layer" />),
    Marker: jest.fn(({ position, children }) => (
        <div data-testid={`mock-marker-${position[0]}-${position[1]}`}>{children}</div>
    )),
    Popup: jest.fn(({ children }) => <div data-testid="mock-popup">{children}</div>),
}));

describe('CustomerMap Component', () => {
    test('renders the initial form with locations', () => {
        render(<CustomerMap />);
        const fromInput = screen.getByLabelText('From:');
        const toInput = screen.getByLabelText('To:');

        expect(fromInput).toBeInTheDocument();
        expect(fromInput.value).toBe('Dai Hoc FPT Ha Noi');
        expect(toInput).toBeInTheDocument();
        expect(toInput.value).toBe('So 33 Duong Tran Cung Quan Bac Tu Liem Ha Noi');
    });

    test('updates locations when typing in the inputs', () => {
        render(<CustomerMap />);

        const fromInput = screen.getByLabelText('From:');
        const toInput = screen.getByLabelText('To:');
        fireEvent.change(fromInput, { target: { value: 'New From Location' } });
        fireEvent.change(toInput, { target: { value: 'New To Location' } });

        expect(fromInput.value).toBe('New From Location');
        expect(toInput.value).toBe('New To Location');
    });


    test('calls handleShowWay when "Show Way" button is clicked', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        render(<CustomerMap />);

        const showWayButton = screen.getByText('Show Way');
        fireEvent.click(showWayButton);

        expect(consoleSpy).toHaveBeenCalledWith(
            'Showing directions from:',
            { name: 'Dai Hoc FPT Ha Noi', lat: 21.0367, lng: 105.8342 },
            'to:',
            { name: 'So 33 Duong Tran Cung Quan Bac Tu Liem Ha Noi', lat: 21.0381, lng: 105.7821 }
        );

        consoleSpy.mockRestore();
    });
});
