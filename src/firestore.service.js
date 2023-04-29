import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import firestore from "./firestore";

export const createTodo = (todo, userId, groupId) => {
  const colRef = collection(firestore, "groups", groupId, "todos");
  addDoc(colRef, {
    title: todo.title,
    description: todo.description,
    user_id: userId,
  });
};

export const deleteTodo = (id, groupId) => {
  const todoRef = doc(firestore,"groups", groupId, "todos", id);
  deleteDoc(todoRef);
};

export const updateTodo = async (todo, id, uid, groupId) => {
  const todoRef = doc(firestore, "groups", groupId, "todos", id);
  await setDoc(todoRef, {
    description: todo.description,
    title: todo.title,
    user_id: uid
  });
};

export const getTodos = async (setTodos, authContext) => {
  const todosCollection = collection(firestore, "groups", authContext.currentGroup, "todos");

  const todosQuery = query(todosCollection)

  const unsubscribe = onSnapshot(todosQuery, (querySnapshot) => {
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
  return () => unsubscribe()
};

export const createGroup = async (name) => {
  const groupRef = collection(firestore, "groups") 
  await addDoc(groupRef, {
    name: name,
  });
};

export const getGroups = async (setGroups, setCurrentUserBelongsTo, userId) => {
  const colRef = collection(firestore, "groups");
  const q = query(colRef);
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const items = [];
    const belongsTo = []
    querySnapshot.forEach((doc) => {
      if(doc.data().members.includes(userId)){
        belongsTo.push(doc.id)
      }
      items.push({
        id: doc.id,
        name: doc.data().name,
      });
    });
    setGroups(items);
    setCurrentUserBelongsTo(belongsTo)
  });
  return () => unsubscribe();
};

export const joinGroup = (groupName, userId, groupId) => {
  const docRef = doc(firestore, "groups", groupId);
  updateDoc(docRef, {
    members: arrayUnion(userId),
  });
};

export const leaveGroup = async (userId, groupId) => {
  // Get a reference to your collection
  const docRef = doc(firestore, "groups", groupId);

  updateDoc(docRef, {
    members: arrayRemove(userId),
  });
};
