import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import App from "../App";

describe("App", () => {
  test("Test app is rendered correctly", () => {
    const {asFragment, getByText} = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  });
});
