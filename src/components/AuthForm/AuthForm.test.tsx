import { render, screen, fireEvent } from "@testing-library/react";
import AuthForm from "./AuthForm";
import { useAuth } from "../../context";

// Mock the useAuth hook
jest.mock("../../context", () => ({
  useAuth: jest.fn(),
}));

describe("AuthForm Component", () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks();

    // Mock the useAuth hook to return the necessary values
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
  });

  it("renders the AuthForm with the correct elements", () => {
    render(<AuthForm />);

    expect(screen.getByTestId("auth-form-container")).toBeInTheDocument();
    expect(screen.getByTestId("auth-form-heading")).toHaveTextContent("Login");
    expect(screen.getByTestId("auth-form-email")).toBeInTheDocument();
    expect(screen.getByTestId("auth-form-password")).toBeInTheDocument();
    expect(screen.getByTestId("auth-form-button")).toBeInTheDocument();
  });

  it("updates email and password state when input values change", () => {
    render(<AuthForm />);

    fireEvent.change(screen.getByTestId("auth-form-email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("auth-form-password"), {
      target: { value: "password123" },
    });

    expect(screen.getByTestId("auth-form-email")).toHaveValue(
      "test@example.com"
    );
    expect(screen.getByTestId("auth-form-password")).toHaveValue("password123");
  });

  it("calls the login function with the correct arguments when the button is clicked", () => {
    render(<AuthForm />);

    fireEvent.change(screen.getByTestId("auth-form-email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("auth-form-password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByTestId("auth-form-button"));

    expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("disables the button when email or password is empty", () => {
    render(<AuthForm />);

    fireEvent.change(screen.getByTestId("auth-form-email"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByTestId("auth-form-password"), {
      target: { value: "password123" },
    });

    expect(screen.getByTestId("auth-form-button")).toBeDisabled();
  });

  it("enables the button when both email and password are provided", () => {
    render(<AuthForm />);

    fireEvent.change(screen.getByTestId("auth-form-email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("auth-form-password"), {
      target: { value: "password123" },
    });

    expect(screen.getByTestId("auth-form-button")).not.toBeDisabled();
  });
});
