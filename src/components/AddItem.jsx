import firestore from "../firestore";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

const AddItem = () => {
  const [todo, setTodo] = useState({ description: "", title: "" });

  // Update todo object on user input
  const updateInput = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  // Send todo object to fire store
  const addTodo = (e) => {
    e.preventDefault();
    const todoRef = collection(firestore, "todos");
    try {
      addDoc(todoRef, todo);
      console.log("Document written with ID: ", todoRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTodo({ title: "", description: "" });
  };

  return (
    <form onSubmit={addTodo}>
      <input
        onChange={updateInput}
        type="text"
        name="title"
        placeholder="Title"
        value={todo.title}
      />
      <input
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
