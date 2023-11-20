import { render, screen } from "@testing-library/react";
import Description from "./Description";

jest.mock("../../utils", () => ({
  shortString: jest.fn((str, length) =>
    str.length > length ? str.slice(0, length) + "..." : str
  ),
}));

describe("Description Component", () => {
  const defaultProps = {
    selected: false,
    title: "Test Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    shortLength: 10,
  };

  it("renders with the correct title and short description when not selected", () => {
    render(<Description {...defaultProps} />);

    const descTitle = screen.getByTestId("desc-title");
    const descDescription = screen.getByTestId("desc-description");

    expect(descTitle).toBeInTheDocument();
    expect(descDescription).toBeInTheDocument();
    expect(descDescription).toHaveTextContent("Lorem ipsu...");
  });

  it("renders with the full description when selected", () => {
    render(<Description {...defaultProps} selected={false} />);

    const descDescription = screen.getByTestId("desc-description");

    expect(descDescription).toBeInTheDocument();
  });

  it("applies the correct styles when selected", () => {
    render(<Description {...defaultProps} selected={true} />);

    const container = screen.getByTestId("desc-container");

    expect(container).toHaveClass("desc-container-selected");
  });

  it("applies the correct styles when not selected", () => {
    render(<Description {...defaultProps} selected={false} />);

    const container = screen.getByTestId("desc-container");

    expect(container).toHaveClass("desc-container");
  });
});
