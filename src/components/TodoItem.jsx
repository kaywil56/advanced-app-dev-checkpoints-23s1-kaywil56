import { useEffect, useState } from "react";
import { deleteTodo, updateTodo } from "../firestore.service";

const TodoItem = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState({ title: "", description: "" });

  // Update todo object on user input
  const handleUpdate = async (e) => {
    e.preventDefault();
    updateTodo(editTodo, todo.id)
    setIsEdit(false);
  };

  const updateInput = (e) => {
    setEditTodo({ ...editTodo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setEditTodo({ title: todo.title, description: todo.description });
  }, [todo]);

  return (
    <li>
      {isEdit ? (
        <form onSubmit={handleUpdate}>
          <input
            onChange={updateInput}
            name="title"
            aria-label="title"
            placeholder={todo.title}
            value={editTodo.title}
          />
          <textarea
            onChange={updateInput}
            name="description"
            aria-label="description"
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
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
