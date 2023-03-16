import { useState } from "react";
import { createTodo } from "../firestore.service";
import { IoAddOutline } from "react-icons/io5";

const AddItem = () => {
  const [todo, setTodo] = useState({ description: "", title: "" });

  // Update todo object on user input
  const updateInput = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTodo(todo);
    setTodo({ title: "", description: "" });
  };

  return (
    <form id="add-item" onSubmit={onSubmit}>
      <input
        className="add-todo-inpts"  
        onChange={updateInput}
        aria-label="title"
        type="text"
        name="title"
        placeholder="Title"
        value={todo.title}
        autocomplete="off"
      />
      <textarea
        className="add-todo-inpts"
        onChange={updateInput}
        aria-label="description"
        id="description"
        type="text"
        name="description"
        placeholder="Description"
        value={todo.description}
        autocomplete="off"
      />
      <button id="create-todo" type="submit">
        <IoAddOutline style={{ color: "#fff", fontSize: "1.25em" }} />
      </button>
    </form>
  );
};

export default AddItem;
