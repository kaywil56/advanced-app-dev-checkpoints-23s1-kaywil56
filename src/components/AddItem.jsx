import { useState, useContext } from "react";
import { createTodo } from "../firestore.service";
import { IoAddOutline } from "react-icons/io5";
import { Context } from '../context'

const AddItem = () => {
  const [todo, setTodo] = useState({ description: "", title: "" });
  const authContext = useContext(Context)
  const updateInput = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTodo(todo, authContext[0].uid);
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
        autoComplete="off"
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
        autoComplete="off"
      />
      <button id="create-todo" type="submit">
        <IoAddOutline style={{ color: "#fff", fontSize: "1.25em" }} />
      </button>
    </form>
  );
};

export default AddItem;
