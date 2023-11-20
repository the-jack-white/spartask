import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header.tsx";
import { useAuth } from "../../context";

jest.mock("../../context/Auth/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockLogout = jest.fn();

describe("Render Header Component", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ logout: mockLogout });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the header with logo", () => {
    render(<Header />);

    const headingHeader = screen.getByTestId("header-logo");

    expect(headingHeader).toBeInTheDocument();
  });

  it("calls logout function when the button is clicked", () => {
    render(<Header />);

    const headingButton = screen.getByTestId("header-button");

    fireEvent.click(headingButton);

    expect(mockLogout).toHaveBeenCalled();
  });

  it("renders the logout button with the correct icon", () => {
    render(<Header />);

    const headingButton = screen.getByTestId("header-button");

    expect(
      headingButton.querySelector(".bi-box-arrow-right")
    ).toBeInTheDocument();
  });
});
