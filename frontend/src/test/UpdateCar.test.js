import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UpdateCar from "../pages/car/UpdateCar";
import axios from "axios";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("UpdateCar Component", () => {
  const mockCarDetails = {
    CarName: "Test Car",
    CarDescription: "A description of the test car",
    Price: 1000,
    CarImage: "/img/test-car.jpg",
    CarType: "SUV",
    Seats: "5",
    Gear: "Auto",
    Fuel: "Gasoline",
    Brand: "Toyota",
  };

beforeAll(() => {
  global.alert = jest.fn();

    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
          store[key] = value;
        }),
        clear: jest.fn(() => {
          store = {};
        }),
      };
    })();

    Object.defineProperty(global, "localStorage", { value: localStorageMock });
  });

  beforeEach(() => {
    localStorage.getItem.mockReturnValue(JSON.stringify({ role: 2 }));

    axios.get.mockImplementation((url) => {
      if (url.includes("api/car-features")) {
        return Promise.resolve({ data: [1] }); // Mock feature IDs to match Air Conditioning being selected
      }
      if (url.includes("api/feature")) {
        return Promise.resolve({
          data: [
            { FeatureID: 1, Name: "Air Conditioning" },
            { FeatureID: 2, Name: "Sunroof" },
          ],
        });
      }
      if (url.includes("api/car")) {
        return Promise.resolve({ data: mockCarDetails });
      }
        return Promise.resolve({ data: {} });
      });
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test("renders UpdateCar component correctly", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <UpdateCar />
        </BrowserRouter>
      );
    });

    // Wait for car details to load
    await waitFor(() => {
      expect(screen.getByDisplayValue(mockCarDetails.CarName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockCarDetails.CarDescription)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockCarDetails.Price.toString())).toBeInTheDocument();
  });

  // Wait for features to render
    await waitFor(() => {
      const airConditioning = screen.getByLabelText("Air Conditioning");
      expect(airConditioning).toBeInTheDocument();
      expect(airConditioning.checked).toBe(true);

      const sunroof = screen.getByLabelText("Sunroof");
      expect(sunroof).toBeInTheDocument();
      expect(sunroof.checked).toBe(false); // Sunroof should now be unchecked as per the mock
    });
  });

  test("validates form fields on submit", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <UpdateCar />
        </BrowserRouter>
    );
  });

  // Clear required fields and submit form
    fireEvent.change(screen.getByLabelText("Enter Name"), { target: { value: "" } });
    fireEvent.click(screen.getByText("Confirm"));

    // Verify validation error messages
    expect(screen.getByText("Car name is required.")).toBeInTheDocument();
  });

  test("submits form successfully", async () => {
    axios.put.mockResolvedValueOnce({ data: { message: "Car updated successfully!" } });

    await act(async () => {
      render(
        <BrowserRouter>
          <UpdateCar />
        </BrowserRouter>
      );
    });

    // Simulate form submission
    fireEvent.click(screen.getByText("Confirm"));

    // Verify success message
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalled();
    });
  });

  test("handles unauthorized access", async () => {
    localStorage.getItem.mockReturnValue(null);

    await act(async () => {
      render(
        <BrowserRouter>
          <UpdateCar />
        </BrowserRouter>
      );
    });

    // Verify access denied message
    expect(screen.getByText("Access Denied")).toBeInTheDocument();
  });
});
