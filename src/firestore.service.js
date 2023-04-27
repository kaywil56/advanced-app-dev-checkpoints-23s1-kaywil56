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
  arrayUnion,
  arrayRemove,
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
  await setDoc(doc(firestore, "groups", name), {
    name: name,
  });
};

export const deleteTodo = (id) => {
  const todoRef = doc(firestore, "todos", id);
  deleteDoc(todoRef);
};

export const updateTodo = async (todo, id, uid) => {
  const todoRef = doc(firestore, "todos", id);
  await setDoc(todoRef, {
    description: todo.description,
    title: todo.title,
    user_id: uid
  });
};

export const getTodos = async (setTodos, setUnsubscribe, authContext) => {
  const groupsCollection = collection(firestore, "groups");

  let todosQuery

  const usersQuery = query(
    groupsCollection,
    where("members", "array-contains", `${authContext.uid}`)
  );

  // Retrieve the documents that match the query
  const usersDocs = await getDocs(usersQuery);

  let userIds = [];
  usersDocs.forEach((user) => {
    user.data().members.forEach((member) => {
      userIds.push(member);
    })
  });

  const todosCollection = collection(firestore, "todos");

  if(authContext.currentGroup == authContext.uid){
    todosQuery = query(todosCollection, where("user_id", "==", authContext.uid));
  }else{
    todosQuery = query(todosCollection, where("user_id", "in", userIds));
  }

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
  // return () => unsubscribe();
};

export const joinGroup = (groupName, userId, groupId) => {
  const userRef = doc(firestore, "users", userId);
  updateDoc(userRef, {
    group: groupName,
  });

  // Get a reference to your collection
  const docRef = doc(firestore, "groups", groupId);

  updateDoc(docRef, {
    members: arrayUnion(userId),
  });
};

export const leaveGroup = async (userId, groupId) => {
  const currentUserDocRef = doc(firestore, `users/${userId}`);
  console.log("userID: " , userId)
  console.log("groupID", groupId)
  await updateDoc(currentUserDocRef, {
    group: userId,
  });

  // Get a reference to your collection
  const docRef = doc(firestore, "groups", groupId);

  updateDoc(docRef, {
    members: arrayRemove(userId),
  });
};

export const getCurrentGroup = async (userId) => {
  const userDocRef = await getDoc(doc(firestore, "users", userId));
  return userDocRef.data().group;
};
