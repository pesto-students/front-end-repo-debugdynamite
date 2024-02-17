import { render, screen } from "@testing-library/react";
import BackButton from "../BackButton";

test("should render back button", () => {
  render(<BackButton />);
  const backButton = screen.getByTestId("back-button");

  expect(backButton).toBeInTheDocument();
  expect(backButton).toHaveTextContent("BackButton");
});
