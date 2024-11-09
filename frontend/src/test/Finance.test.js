import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Finance from "../pages/admin/Finance";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("axios");

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Finance Component", () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  test("displays loading indicator initially", () => {
    // Mock an API call that takes time to resolve
    axios.get.mockImplementationOnce(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <Finance />
      </MemoryRouter>
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("displays finance data after successful fetch", async () => {
    const financeDataMock = [
      { Date: "2024-01-01", totalMoney: 5000 },
      { Date: "2024-02-01", totalMoney: 7000 },
    ];
    axios.get.mockResolvedValueOnce({ data: financeDataMock });

    render(
      <MemoryRouter>
        <Finance />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/financial overview/i));
    expect(screen.getByText(/financial overview/i)).toBeInTheDocument();
    expect(
      screen.queryByText("No data available for this year")
    ).not.toBeInTheDocument();
  });

  test("displays error message on fetch failure", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network Error"));

    render(
      <MemoryRouter>
        <Finance />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/unable to fetch financial data/i));
    expect(
      screen.getByText(/unable to fetch financial data/i)
    ).toBeInTheDocument();
  });

  test("displays no data message if response is empty", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <Finance />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("No data available for this year"));
    expect(
      screen.getByText("No data available for this year")
    ).toBeInTheDocument();
  });

  test("handles year change correctly", async () => {
    const financeDataMock2023 = [
      { Date: "2023-01-01", totalMoney: 8000 },
      { Date: "2023-02-01", totalMoney: 6000 },
    ];
    axios.get.mockResolvedValueOnce({ data: financeDataMock2023 });

    render(
      <MemoryRouter>
        <Finance />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Select Year"), {
      target: { value: "2023" },
    });

    await waitFor(() => screen.getByText(/financial overview/i));
    expect(screen.getByText(/financial overview/i)).toBeInTheDocument();
  });
});
