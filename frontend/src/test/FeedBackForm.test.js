import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import FeedbackForm from "../pages/car/FeedbackForm";
import "@testing-library/jest-dom";
import { useNavigate } from "react-router-dom";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(), // Mock useNavigate
  useLocation: jest.fn(),
}));

describe("FeedbackForm Component", () => {
  const mockCarData = {
    CarName: "Test Car",
  };

  const mockUserData = {
    id: 1,
    role: 3,
  };

  const mockNavigate = jest.fn(); // Mock navigate function

  beforeEach(() => {
    // Mock localStorage
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
    localStorage.getItem.mockReturnValue(JSON.stringify(mockUserData));

    // Mock axios
    axios.get.mockResolvedValue({ data: mockCarData });
    axios.post.mockResolvedValue({});
    axios.put.mockResolvedValue({});

    // Mock window.alert
    global.alert = jest.fn();

    // Mock useNavigate
    useNavigate.mockReturnValue(mockNavigate);

    // Mock useLocation
    jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
      state: { carId: 1 }, // Mock carId
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders feedback form correctly with car name", async () => {
    render(
      <BrowserRouter>
        <FeedbackForm />
      </BrowserRouter>
    );

    // Wait for car name to load and verify it renders correctly
    await waitFor(() => {
      const carNameElement = screen.getByText(/Feedback Car:/i);
      expect(carNameElement).toHaveTextContent(`Feedback Car: ${mockCarData.CarName}`);
    });

    expect(screen.getByPlaceholderText("Leave your feedback here...")).toBeInTheDocument();
    expect(screen.getByText("Submit Feedback")).toBeInTheDocument();
  });

  test("displays error messages for missing inputs", async () => {
    render(
      <BrowserRouter>
        <FeedbackForm />
      </BrowserRouter>
    );

    // Click the submit button without selecting a rating
    fireEvent.click(screen.getByText("Submit Feedback"));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Please select a star rating before submitting your feedback."
      );
    });

    // Select a rating and leave feedback empty
    fireEvent.click(screen.getAllByText("☆")[4]); // Select the 5th star
    fireEvent.click(screen.getByText("Submit Feedback"));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Please enter your feedback.");
    });
  });

  test("submits feedback successfully", async () => {
    render(
      <BrowserRouter>
        <FeedbackForm />
      </BrowserRouter>
    );

    // Select a rating
    fireEvent.click(screen.getAllByText("☆")[4]); // Click the 5th star (index 4)
    fireEvent.change(screen.getByPlaceholderText("Leave your feedback here..."), {
      target: { value: "Great car!" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Submit Feedback"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/api/feedback", {
        CarID: 1,
        CustomerID: mockUserData.id,
        FeedbackDescription: "Great car!",
        Rate: 5,
      });
      expect(axios.put).toHaveBeenCalledWith("http://localhost:5000/api/car/update-rating/1");
    });

    expect(global.alert).toHaveBeenCalledWith("Feedback submitted successfully!");
    expect(mockNavigate).toHaveBeenCalledWith("/car-status"); // Verify navigate is called
  });

  test("handles unauthorized access", () => {
    localStorage.getItem.mockReturnValue(null); // Mock unauthorized user

    render(
      <BrowserRouter>
        <FeedbackForm />
      </BrowserRouter>
    );

    expect(screen.getByText("Access Denied")).toBeInTheDocument();
    expect(screen.getByText("You do not have permission to view this page.")).toBeInTheDocument();
  });
});
