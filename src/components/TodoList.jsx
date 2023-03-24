import TodoItem from "./TodoItem";
import { useEffect, useState, useContext } from "react";
import { getTodos } from "../firestore.service";
import { Context } from '../context'

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  let authContext = useContext(Context)

  useEffect(() => {
    getTodos(setTodos, authContext[0].uid);
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
