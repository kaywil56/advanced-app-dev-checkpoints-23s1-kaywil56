import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import TodoList from "../components/TodoList";
import { getTodos } from "../firestore.service";

vi.mock("../firestore.service", () => {
  return { getTodos: vi.fn() };
});

describe("TodoList", () => {
  test("Test that onSnapShot is called on mount", () => {
    render(<TodoList />);
    expect(getTodos).toHaveBeenCalledOnce()
  });
});
