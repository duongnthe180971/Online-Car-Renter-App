import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import FinanceCarOwner from "../pages/car_owner/FinanceCarOwner";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("axios");

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("FinanceCarOwner Component", () => {
  beforeEach(() => {
    axios.get.mockClear();
    localStorage.clear();
  });

  test("displays loading indicator initially", async () => {
    localStorage.setItem("user", JSON.stringify({ id: "testUserId" }));

    axios.get.mockImplementationOnce(() => new Promise(() => {}));

    await act(async () => {
      render(
        <MemoryRouter>
          <FinanceCarOwner />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/loading data.../i)).toBeInTheDocument();
  });

  test("displays finance data after successful fetch", async () => {
    localStorage.setItem("user", JSON.stringify({ id: "testUserId" }));

    const financeDataMock = [
      { Date: "2024-01-01", totalMoney: 3000 },
      { Date: "2024-02-01", totalMoney: 5000 },
    ];

    axios.get.mockResolvedValueOnce({ data: financeDataMock });

    await act(async () => {
      render(
        <MemoryRouter>
          <FinanceCarOwner />
        </MemoryRouter>
      );
    });

    await waitFor(() => screen.getByText(/finance carowner/i));
    expect(screen.getByText(/finance carowner/i)).toBeInTheDocument();
    expect(
      screen.queryByText("No data available for this year")
    ).not.toBeInTheDocument();
  });

  test("displays error message on fetch failure", async () => {
    localStorage.setItem("user", JSON.stringify({ id: "testUserId" }));

    axios.get.mockRejectedValueOnce(new Error("Network Error"));

    await act(async () => {
      render(
        <MemoryRouter>
          <FinanceCarOwner />
        </MemoryRouter>
      );
    });

    await waitFor(() => screen.getByText(/unable to fetch financial data/i));
    expect(
      screen.getByText(/unable to fetch financial data/i)
    ).toBeInTheDocument();
  });

  test("displays no data message if response is empty", async () => {
    localStorage.setItem("user", JSON.stringify({ id: "testUserId" }));

    axios.get.mockResolvedValueOnce({ data: [] });

    await act(async () => {
      render(
        <MemoryRouter>
          <FinanceCarOwner />
        </MemoryRouter>
      );
    });

    await waitFor(() => screen.getByText("No data available for this year"));
    expect(
      screen.getByText("No data available for this year")
    ).toBeInTheDocument();
  });

  test("does not fetch data if Accid is not set", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <FinanceCarOwner />
        </MemoryRouter>
      );
    });

    expect(axios.get).not.toHaveBeenCalled();
  });

  test("handles year change correctly", async () => {
    localStorage.setItem("user", JSON.stringify({ id: "testUserId" }));

    const financeDataMock2023 = [
      { Date: "2023-01-01", totalMoney: 7000 },
      { Date: "2023-02-01", totalMoney: 4000 },
    ];

    axios.get.mockResolvedValueOnce({ data: financeDataMock2023 });

    await act(async () => {
      render(
        <MemoryRouter>
          <FinanceCarOwner />
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Select Year"), {
        target: { value: "2023" },
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/finance carowner/i)).toBeInTheDocument();
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:5000/api/finance/carOwner/testUserId/2023"
      );
    });
  });
});
