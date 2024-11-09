import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import UserManagement from "../pages/admin/UserManagement";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import "@testing-library/jest-dom/extend-expect";

// Mock global alert and confirm
global.alert = jest.fn();
global.confirm = jest.fn(() => true);

// Mock fetch function
global.fetch = jest.fn();

beforeEach(() => {
  global.alert.mockClear();
  global.confirm.mockClear();
  global.fetch.mockClear();
});

describe("UserManagement Component", () => {
  test("displays user data after successful fetch", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, UserName: "User1", Role: 1, Status: true },
        { id: 2, UserName: "User2", Role: 3, Status: true },
      ],
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <UserManagement />
        </MemoryRouter>
      );
    });

    // Ensure user data is displayed after fetch
    await waitFor(() =>
      expect(screen.getByText("Manage Users")).toBeInTheDocument()
    );
    expect(screen.getByText("User1")).toBeInTheDocument();
    expect(screen.getByText("User2")).toBeInTheDocument();
  });

  test("displays error message on fetch failure", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to fetch users"));

    await act(async () => {
      render(
        <MemoryRouter>
          <UserManagement />
        </MemoryRouter>
      );
    });

    // Ensure error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  test("filters users by role", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, UserName: "User1", Role: 1, Status: true },
        { id: 2, UserName: "User2", Role: 3, Status: true },
        { id: 3, UserName: "User3", Role: 2, Status: true },
      ],
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <UserManagement />
        </MemoryRouter>
      );
    });

    await waitFor(() => screen.getByText("Manage Users"));

    // Apply "Customer" role filter
    fireEvent.change(screen.getByLabelText("Filter by Role:"), {
      target: { value: "3" },
    });

    expect(screen.getByText("User2")).toBeInTheDocument();
    expect(screen.queryByText("User1")).not.toBeInTheDocument();
    expect(screen.queryByText("User3")).not.toBeInTheDocument();
  });

  test("blocks admin user from deletion", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, UserName: "AdminUser", Role: 1, Status: true },
      ],
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <UserManagement />
        </MemoryRouter>
      );
    });

    await waitFor(() => screen.getByText("Manage Users"));

    // Attempt to delete "AdminUser"
    fireEvent.click(screen.getByText("Remove"));

    expect(global.alert).toHaveBeenCalledWith(
      "Admin accounts cannot be deactivated."
    );
  });

  test("paginates users correctly", async () => {
    const mockUsers = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      UserName: `User${i + 1}`,
      Role: 3,
      Status: true,
    }));

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <UserManagement />
        </MemoryRouter>
      );
    });

    await waitFor(() => screen.getByText("Manage Users"));

    // Verify users on the first page
    expect(screen.getByText("User1")).toBeInTheDocument();
    expect(screen.getByText("User2")).toBeInTheDocument();
    expect(screen.getByText("User3")).toBeInTheDocument();
    expect(screen.queryByText("User4")).not.toBeInTheDocument();

    // Move to the next page
    fireEvent.click(screen.getByText("Next"));

    expect(screen.getByText("User4")).toBeInTheDocument();
    expect(screen.getByText("User5")).toBeInTheDocument();
  });
});
