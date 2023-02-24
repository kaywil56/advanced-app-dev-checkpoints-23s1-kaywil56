import DeleteItem from "./DeleteItem";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import firestore from "../firestore";

const TodoItem = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState({title: "", description: ""});
  // Update todo object on user input

  const handleUpdate = async (e) => {
    e.preventDefault();
    const todoRef = doc(firestore, "todos", todo.id);
    await setDoc(
      todoRef,
      { description: editTodo.description, title: editTodo.title },
      { merge: true }
    );
    setIsEdit(false)
  };

  const updateInput = (e) => {
    setEditTodo({ ...editTodo, [e.target.name]: e.target.value });
  };

  return (
    <li>
      {isEdit ? (
        <form onSubmit={handleUpdate}>
          <input
            onChange={updateInput}
            name="title"
            placeholder={todo.title}
            value={editTodo.title}
          />
          <textarea
            onChange={updateInput}
            name="description"
            placeholder={todo.description}
            value={editTodo.description}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <button onClick={() => setIsEdit(true)}>Edit</button>
          <DeleteItem uid={todo.id} />
        </>
      )}
    </li>
  );
};

export default TodoItem;
