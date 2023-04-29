import TodoItem from "./TodoItem";
import { useEffect, useState, useContext } from "react";
import { getTodos } from "../firestore.service";
import AuthContext from "../AuthContext";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const { authContext, setAuthContext } = useContext(AuthContext);

  const handleGoBack = () => {
    setAuthContext({
      uid: authContext.uid,
      email: authContext.email,
      currentGroup: null
    })
  }

  useEffect(() => {
    getTodos(setTodos, authContext);   
  }, []);

  return (
    <>
    <button id="back-btn" onClick={() => handleGoBack()}>BACK</button>
    <ul>
      {todos.map((todo, idx) => {
        return <TodoItem key={idx} todo={todo} />;
      })}
    </ul>
    </>
  );
};

export default TodoList;
