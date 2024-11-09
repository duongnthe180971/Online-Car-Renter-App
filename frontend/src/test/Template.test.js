import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import CarTemplate from "../pages/admin/CarTemplate";

const mockFeatures = [
  { FeatureID: 1, Name: "Air Conditioning" },
  { FeatureID: 2, Name: "Bluetooth" },
];

describe("CarTemplate Component - Button Functionality", () => {
  beforeEach(() => {
    // Mock fetch for initial feature load
    global.fetch = jest.fn().mockImplementation((url, options) => {
      if (url === "http://localhost:5000/api/features" && !options) {
        // Initial fetch
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockFeatures),
        });
      } else if (
        url === "http://localhost:5000/api/features" &&
        options.method === "POST"
      ) {
        // Mock adding a new feature
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ FeatureID: 3, Name: "GPS" }),
        });
      } else if (
        url.startsWith("http://localhost:5000/api/features/") &&
        options.method === "DELETE"
      ) {
        // Mock removing a feature
        return Promise.resolve({ ok: true });
      }
    });

    // Mock window.alert to avoid "Not implemented" error
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('clicking "Add Feature" button adds a new feature if validation passes', async () => {
    render(
      <MemoryRouter>
        <CarTemplate />
      </MemoryRouter>
    );

    // Wait for initial features to load
    await waitFor(() =>
      expect(screen.getByText("Air Conditioning")).toBeInTheDocument()
    );

    // Simulate adding a new feature
    const input = screen.getByPlaceholderText("Enter new feature");
    fireEvent.change(input, { target: { value: "GPS" } });
    const addButton = screen.getByText("Add Feature");
    fireEvent.click(addButton);

    // Check if the new feature is added
    await waitFor(() => expect(screen.getByText("GPS")).toBeInTheDocument());
  });

  test('clicking "Remove" button removes a feature', async () => {
    render(
      <MemoryRouter>
        <CarTemplate />
      </MemoryRouter>
    );

    // Wait for initial features to load
    await waitFor(() =>
      expect(screen.getByText("Air Conditioning")).toBeInTheDocument()
    );

    // Simulate removing a feature
    const removeButton = screen.getAllByText("Remove")[0]; // Select the first feature's remove button
    fireEvent.click(removeButton);

    // Check if the feature is removed
    await waitFor(() =>
      expect(screen.queryByText("Air Conditioning")).not.toBeInTheDocument()
    );
  });
});
