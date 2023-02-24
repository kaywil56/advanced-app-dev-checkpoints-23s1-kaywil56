import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect } from "react";
import firestore from "../firestore";

const TodoList = () => {
  useEffect(() => {
    const fetchTodos = async () => {
      const q = await query(collection(firestore, "todos"));
      onSnapshot(q, (querySnapshot) => {
        const todos = [];
        querySnapshot.forEach((doc) => {
          todos.push({
            title: doc.data().title,
            description: doc.data().description,
          });
        });
      });
    };
    fetchTodos();
  }, []);
  return <li>hi</li>;
};

export default TodoList;
