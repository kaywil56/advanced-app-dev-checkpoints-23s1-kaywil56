import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";
import { getTodos } from "../firestore.service";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos(setTodos);
  }, []);

  return (
    <ul>
      {todos.map((todo, idx) => {
        return <TodoItem key={idx} todo={todo} />;
      })}
    </ul>
  );
};

export default TodoList;
