import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading Component", () => {
  const defaultProps = {
    title: "Test Title",
    date: "2023-11-17",
  };

  it("renders with the correct title and date", () => {
    render(<Heading {...defaultProps} />);

    expect(screen.getByTestId("heading-title")).toHaveTextContent("Test Title");
    expect(screen.getByTestId("heading-date")).toHaveTextContent("2023-11-17");
  });

  it("renders with only the correct title when date is not provided", () => {
    const { date, ...propsWithoutDate } = defaultProps;

    render(<Heading {...propsWithoutDate} />);

    expect(screen.getByTestId("heading-title")).toHaveTextContent("Test Title");
    expect(screen.getByTestId("heading-date")).toHaveTextContent("");
  });
});
