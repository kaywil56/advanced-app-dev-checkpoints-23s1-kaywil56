import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, beforeEach, vi } from "vitest";
import TodoItem from "../components/TodoItem";
import { updateTodo, deleteTodo } from "../firestore.service";

// Mock firestore update function
vi.mock("../firestore.service", () => {
  return { updateTodo: vi.fn(), deleteTodo: vi.fn() };
});

describe("TodoItem", () => {
  // Render the TodoItem for each case
  beforeEach(() => {
    const mockTodo = {
      id: "H01tqXVkWLuJJfYwpYii",
      title: "Grocery shopping",
      description: "Buy milk",
    };
    render(<TodoItem todo={mockTodo} />);
  });

  test("TodoItem component renders properly", () => {
    // Assert that mock props are displayed
    expect(screen.getByText(/^Grocery shopping$/i)).to.exist;
    expect(screen.getByText(/^Buy milk$/i)).to.exist;
  });

  test("Update todo", () => {
    // On load the input elements should not be visible
    // Once toggled the input elements should be visible
    expect(screen.queryByRole("textbox", { name: "title" })).to.not.exist;
    expect(screen.queryByRole("textbox", { name: "description" })).to.not.exist;

    // Fire the toggle edit event
    const toggleEditBtn = screen.getByText(/Edit/i);
    fireEvent.click(toggleEditBtn);

    // Select edit input elements
    const titleInput = screen.getByRole("textbox", { name: "title" });
    const descriptionInput = screen.getByRole("textbox", {
      name: "description",
    });
    // Add test input
    fireEvent.change(titleInput, {
      target: { value: "Grocery shopping to be done" },
    });
    fireEvent.change(descriptionInput, {
      target: { value: "buy milk, eggs, bread" },
    });
    // Submit update form
    const submitFormBtn = screen.getByText(/Save/i);
    fireEvent.click(submitFormBtn);

    // Expect the update to to be called once
    expect(updateTodo).toHaveBeenCalledWith(
      {
        title: "Grocery shopping to be done",
        description: "buy milk, eggs, bread",
      },
      "H01tqXVkWLuJJfYwpYii"
    );
  });

  test("Delete todo", () => {
    // Fire the toggle edit event
    const deleteBtn = screen.getByText(/Delete/i);
    fireEvent.click(deleteBtn);

    expect(deleteTodo).toHaveBeenCalledWith("H01tqXVkWLuJJfYwpYii");
  });
});
