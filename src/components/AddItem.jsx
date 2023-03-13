import { useState } from "react";
import {createTodo} from '../firestore.service'

const AddItem = () => {
  const [todo, setTodo] = useState({ description: "", title: "" });

  // Update todo object on user input
  const updateInput = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault()
    createTodo(todo)
    setTodo({ title: "", description: "" });
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={updateInput}
        type="text"
        name="title"
        placeholder="Title"
        value={todo.title}
      />
      <textarea
        onChange={updateInput}
        type="text"
        name="description"
        placeholder="Description"
        value={todo.description}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddItem;
