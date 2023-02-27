import TodoItem from "./TodoItem";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect } from "react";
import firestore from "../firestore";
import { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const q = await query(collection(firestore, "todos"));
      onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
          });
        });
        setTodos(items);
      });
    };
    fetchTodos();
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
