import { render, screen } from "@testing-library/react";
import AppContainer from "./AppContainer";

describe("AppContainer Component", () => {
  it("renders the AppContainer with children", () => {
    const childText = "Hello, World!";
    render(<AppContainer>{childText}</AppContainer>);

    const appContainer = screen.getByTestId("app-container");

    expect(appContainer).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
