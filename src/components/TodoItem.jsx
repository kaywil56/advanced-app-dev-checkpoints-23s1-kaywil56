import DeleteItem from "./DeleteItem";
import { useState } from "react";

const TodoItem = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);

  // Update todo object on user input
  const updateInput = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  return (
    <li>
      {isEdit ? (
        <>
          <input onChange={updateInput} placeholder={todo.title} />
          <textarea onChange={updateInput} placeholder={todo.description} />
        </>
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
