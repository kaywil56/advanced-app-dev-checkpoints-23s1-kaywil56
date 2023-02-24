import firestore from "../firestore";
import { deleteDoc, doc } from "firebase/firestore";

const DeleteItem = ({ uid }) => {
  const deleteTodo = async () => {
    const todoRef = doc(firestore, "todos", uid);
    await deleteDoc(todoRef);
  };

  return <button onClick={deleteTodo}>Delete</button>;
};

export default DeleteItem;
