import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import firestore from "./firestore";

export const createTodo = (todo, userId) => {
  const docRef = doc(firestore, "users", userId);
  const colRef = collection(docRef, "todos");
  addDoc(colRef, todo);
};

export const createUser = async (user) => {
  await setDoc(doc(firestore, "users", user.uid), {
    user_id: user.uid,
    email: user.email,
  });
};

export const deleteTodo = (uid, userId) => {
  const todoRef = doc(firestore, "users", userId, "todos", uid);
  deleteDoc(todoRef);
};

export const updateTodo = async (todo, uid, userId) => {
  const todoRef = doc(firestore, "users", userId, "todos", uid);
  await setDoc(
    todoRef,
    { description: todo.description, title: todo.title },
    { merge: true }
  );
};

export const getTodos = async (setTodos, userId, setUnsubscribe) => {
  // No need to query since the doc is retrieved by document ID
  const docRef = doc(firestore, "users", userId);
  const colRef = collection(docRef, "todos");
  const q = query(colRef);
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
  setUnsubscribe(() => unsubscribe);
};
