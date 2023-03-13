import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import firestore from "./firestore";

export const createTodo = (todo) => {
  const todoRef = collection(firestore, "todos");
  addDoc(todoRef, todo);
};

export const deleteTodo = (uid) => {
  const todoRef = doc(firestore, "todos", uid);
  deleteDoc(todoRef);
};

export const updateTodo = async (todo, uid) => {
  const todoRef = doc(firestore, "todos", uid);
  await setDoc(
    todoRef,
    { description: todo.description, title: todo.title },
    { merge: true }
  );
};
