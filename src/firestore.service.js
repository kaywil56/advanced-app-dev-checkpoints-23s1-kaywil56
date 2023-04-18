import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  onSnapshot,
  where,
  query,
  getDoc,
} from "firebase/firestore";
import firestore from "./firestore";

export const createTodo = (todo, userId) => {
  const colRef = collection(firestore, "todos");
  addDoc(colRef, {
    title: todo.title,
    description: todo.description,
    user_id: userId,
  });
};

export const createUser = async (user) => {
  await setDoc(doc(firestore, "users", user.uid), {
    user_id: user.uid,
    email: user.email,
    group: user.uid,
  });
};

export const createGroup = async (name) => {
  const group = {
    name: name,
  };
  const groupRef = collection(firestore, "groups");
  addDoc(groupRef, group);
};

export const deleteTodo = (uid) => {
  const todoRef = doc(firestore, "todos", uid);
  deleteDoc(todoRef);
};

export const updateTodo = async (todo, uid) => {
  const todoRef = doc(firestore, "todos", uid);
  await setDoc(
    todoRef,
    { description: todo.description, title: todo.title, user_id: uid },
  );
};

export const getTodos = async (
  setTodos,
  setUnsubscribe,
  authContext
) => {
  const usersCollection = collection(firestore, "users");
  const usersQuery = query(
    usersCollection,
    where("group", "==", authContext.currentGroup)
  );
  const usersDocs = await getDocs(usersQuery);

  console.log(usersDocs)

  let userIds = [];
  usersDocs.forEach((user) => {
    userIds.push(user.data().user_id);
  });

  const todosCollection = collection(firestore, "todos");
  const todosQuery = query(todosCollection, where("user_id", "in", userIds));

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
  setUnsubscribe(() => unsubscribe);
}

export const getGroups = async (setGroups) => {
  const colRef = collection(firestore, "groups");
  const q = query(colRef);
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        name: doc.data().name,
      });
    });
    setGroups(items);
  });
  // return () => unsubscribe();
};

export const joinGroup = (groupName, userId) => {
  const userRef = doc(firestore, "users", userId);
  updateDoc(userRef, {
    group: groupName,
  });
};

export const leaveGroup = async (userId) => {
  const currentUserDocRef = doc(firestore, "users", userId);
  await updateDoc(currentUserDocRef, {
    group: userId,
  });
};

export const getCurrentGroup = async (userId) => {
  const userDocRef = await getDoc(doc(firestore, "users", userId));
  return userDocRef.data().group;
};
