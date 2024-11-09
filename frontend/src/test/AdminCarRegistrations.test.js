import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminCarRegistrations from "../pages/admin/AdminCarRegistrations";

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]), // Mock dữ liệu ban đầu
  })
);

// Mock window.alert
beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

describe("AdminCarRegistrations Component", () => {
  beforeEach(() => {
    fetch.mockClear(); // Reset fetch mock trước mỗi test
  });

  const renderWithRouter = (ui) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test("calls decline API when Decline button is clicked", async () => {
    const mockCar = {
      CarID: 2,
      CarName: "Test Car 2",
      Brand: "BMW",
      Price: 500000,
      Seats: 4,
      CarImage: "/img/car.png",
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockCar]),
    });

    renderWithRouter(<AdminCarRegistrations />);

    const declineButton = await screen.findByRole("button", {
      name: /Decline/i,
    });
    fireEvent.click(declineButton);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5000/api/register-cars/${mockCar.CarID}/decline`,
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });
});
