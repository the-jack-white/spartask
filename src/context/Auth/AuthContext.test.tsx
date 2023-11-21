import { render, act, fireEvent, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";
import { CookiesProvider } from "react-cookie";

jest.mock("../../utils", () => ({
  simulateFakeRequest: jest.fn(() => Promise.resolve("fakeToken123")),
  simulateFakeRequestValidation: jest.fn(() =>
    Promise.resolve({ token: "fakeToken123", isAuthenticated: true })
  ),
  saveToLocalStorage: jest.fn(),
}));

describe("AuthProvider", () => {
  it("provides the correct context values", async () => {
    render(
      <CookiesProvider>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </CookiesProvider>
    );

    const userTestId = "user-id";
    const loginButtonTestId = "login-button";
    const logoutButtonTestId = "logout-button";

    expect(screen.getByTestId(userTestId)).toHaveTextContent("");

    await act(async () => {
      fireEvent.click(screen.getByTestId(loginButtonTestId));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId(userTestId)).toHaveTextContent(
      "test@example.com"
    );

    act(() => {
      fireEvent.click(screen.getByTestId(logoutButtonTestId));
    });

    expect(screen.getByTestId(userTestId)).toHaveTextContent("");
  });
});

const TestComponent = () => {
  const { currentUser, login, logout } = useAuth();

  const loginHandler = async () => {
    await login("test@example.com", "password123");
  };

  const logoutHandler = () => {
    logout();
  };

  return (
    <div>
      <span data-testid="user-id">{currentUser?.id}</span>
      <button onClick={loginHandler} data-testid="login-button">
        Login
      </button>
      <button onClick={logoutHandler} data-testid="logout-button">
        Logout
      </button>
    </div>
  );
};
