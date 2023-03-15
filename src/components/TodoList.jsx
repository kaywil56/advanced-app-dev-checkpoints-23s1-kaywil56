import TodoItem from "./TodoItem";
// import firestore from "../firestore";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, setDoc, onSnapshot, query } from "firebase/firestore";
import firestore from "../firestore";
import { getTodos } from "../firestore.service";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    getTodos(setTodos)
  }, [])

  return (
    <ul>
      {todos.map((todo, idx) => {
        return <TodoItem key={idx} todo={todo} />;
      })}
    </ul>
  );
};

export default TodoList;
