import AddItem from "./components/AddItem";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Context } from "./context";
import firestore from "./firestore";

const App = () => {
  const auth = getAuth();
  const [authContext, setAuthContext] = useState({});

  const checkUserExists = async (user) => {
    const docRef = doc(firestore, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthContext(user);
        checkUserExists(user);
      } else {
        setAuthContext({});
      }
    });
  }, []);

  return (
    <Context.Provider value={[authContext, setAuthContext]}>
      {authContext.uid ? (
        <main>
          <h1>Todo</h1>
          <AddItem />
          <TodoList />
          <button onClick={() => signOut(auth)} id="sign-out">
            Sign out
          </button>
        </main>
      ) : (
        <Login />
      )}
    </Context.Provider>
  );
};

export default App;
