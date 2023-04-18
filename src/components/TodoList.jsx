import TodoItem from "./TodoItem";
import { useEffect, useState, useContext } from "react";
import { getTodos } from "../firestore.service";
import AuthContext from "../AuthContext";

const TodoList = ({ setUnsubscribe }) => {
  const [todos, setTodos] = useState([]);
  const { authContext } = useContext(AuthContext);

  useEffect(() => {
    if (authContext.currentGroup) {
      console.log(authContext.currentGroup)
      getTodos(setTodos, setUnsubscribe, authContext);
    }    
  }, [authContext.currentGroup]);

  return (
    <ul>
      {todos.map((todo, idx) => {
        return <TodoItem key={idx} todo={todo} />;
      })}
    </ul>
  );
};

export default TodoList;
