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
  collectionGroup,
  getDoc,
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
    group: user.uid
  });
};

export const createGroup = async (name) => {
  const group = {
    name: name,
  };
  const groupRef = collection(firestore, "groups");
  addDoc(groupRef, group);
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
  // Get the current users group
  const currentUserDocRef = doc(firestore, "users", userId);
  await getDoc(currentUserDocRef).then((currentUserDocSnapshot) => {
    let group = currentUserDocSnapshot.data().group;
    const usersCollection = collectionGroup(firestore, "users");
    // Query for users with the matching groupId field
    const q = query(usersCollection, where("group", "==", group));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const promises = [];
      const items = [];
      querySnapshot.forEach((userDoc) => {
        const todosCollection = collection(userDoc.ref, "todos");
        const promise = getDocs(todosCollection).then((todoSnapshot) => {
          todoSnapshot.forEach((todo) => {
            items.push({
              id: todo.id,
              title: todo.data().title,
              description: todo.data().description,
            });
          });
        });
        promises.push(promise);
      });
      Promise.all(promises).then(() => {
        setTodos(items);
      });
    });
    setUnsubscribe(() => unsubscribe);
  });
};

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
  // setUnsubscribe(() => unsubscribe);
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
