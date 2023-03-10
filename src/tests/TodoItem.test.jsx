import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";
import TodoItem from "../components/TodoItem";

describe("TodoItem", () => {
  // beforeEach(() => {
  //   render();
  // });

  test("TodoItem component renders properly", () => {
    const mockTodo = {
      id: "H01tqXVkWLuJJfYwpYii",
      title: "Grocery Shopping",
      description: "Buy milk",
    };

    const todoItemComponent = render(<TodoItem todo={mockTodo} />);
    // Assert that the component rendered
    expect(todoItemComponent).toBeTruthy();

    // Assert that the mock props are being displayed
    const h2 = todoItemComponent.container.querySelector("h2");
    expect(h2.textContent).toBe("Grocery Shopping");

    // Assert that the mock props are being displayed
    const p = todoItemComponent.container.querySelector("p");
    expect(p.textContent).toBe("Buy milk");
  });

  test("Toggle edit", async () => {
    const mockTodo = {
      id: "H01tqXVkWLuJJfYwpYii",
      title: "Grocery Shopping",
      description: "Buy milk",
    };
    render(<TodoItem todo={mockTodo} />);

    // On load the input elements should not be visible
    // Once toggled the input elements should be visible
    expect(screen.queryByRole("textbox", { name: "title" })).not.exist;
    expect(screen.queryByRole("textbox", { name: "description" })).to.not.exist;

    const toggleEditBtn = await screen.getByText(/Edit/i);
    fireEvent.click(toggleEditBtn);

    // Once toggled the input elements should be visible
    expect(screen.getByRole("textbox", { name: "title" })).to.exist;
    expect(screen.getByRole("textbox", { name: "description" })).to.exist;
  });
});
