import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, beforeEach, vi } from "vitest";
import AddItem from "../components/AddItem";
import { createTodo } from "../firestore.service";

// Mock firestore create function
vi.mock("../firestore.service", () => {
  return { createTodo: vi.fn() };
});

describe("AddItem", () => {
  // Render the TodoItem for each case
  beforeEach(() => {
    render(<AddItem/>);
  });

  test("AddItem component renders properly", () => {
    // Assert that mock props are displayed
    expect(screen.getByLabelText('title')).to.exist
    expect(screen.getByLabelText('description')).to.exist
    expect(screen.getByText(/Submit/)).to.exist
  });

  test("create todo", () => {
    // Select edit input elements
    const titleInput = screen.getByRole("textbox", { name: "title" });
    const descriptionInput = screen.getByRole("textbox", {
      name: "description",
    });
    // Add test input
    fireEvent.change(titleInput, {
      target: { value: "Finish Project" },
    });
    fireEvent.change(descriptionInput, {
      target: { value: "Complete final steps" },
    });
    // Fire the create todo event
    const createTodoBtn = screen.getByText(/Submit/i);
    fireEvent.click(createTodoBtn);

    // Expect the update to to be called once
    expect(createTodo).toHaveBeenCalledWith(
      {
        title: "Finish Project",
        description: "Complete final steps",
      }
    );
  });
});
