import { render, screen } from "@testing-library/react";
import AuthContainer from "./AuthContainer";

describe("AuthContainer Component", () => {
  it("renders the AuthContainer with children", () => {
    const childText = "Hello, World!";
    render(<AuthContainer>{childText}</AuthContainer>);

    const authContainer = screen.getByTestId("auth-container");

    expect(authContainer).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
