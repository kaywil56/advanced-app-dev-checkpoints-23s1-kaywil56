import TodoItem from "./TodoItem";
import { useEffect, useState, useContext } from "react";
import { getTodos } from "../firestore.service";
import { Context } from "../context";

const TodoList = ({ setUnsubscribe }) => {
  const [todos, setTodos] = useState([]);
  let authContext = useContext(Context);

  useEffect(() => {
    // Call getTodos when component mounts
    getTodos(setTodos, authContext[0].uid, setUnsubscribe);
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
