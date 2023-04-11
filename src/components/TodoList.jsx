import TodoItem from "./TodoItem";
import { useEffect, useState, useContext } from "react";
import { getTodos } from "../firestore.service";
import AuthContext from "../AuthContext";


const TodoList = ({ setUnsubscribe }) => {
  const [todos, setTodos] = useState([]);
  let authContext = useContext(AuthContext);

  useEffect(() => {
    // Call getTodos when component mounts
    getTodos(setTodos, authContext.uid, setUnsubscribe);
    console.log(todos)
  }, []);

  useEffect(() => {
    // Call getTodos when component mounts
    console.log("Being called")
    getTodos(setTodos, authContext.uid, setUnsubscribe);
  }, [authContext?.group]);

  return (
    <ul>
      {todos.map((todo, idx) => {
        return <TodoItem key={idx} todo={todo} />;
      })}
    </ul>
  );
};

export default TodoList;
