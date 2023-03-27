import AddItem from "./components/AddItem";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { createUser } from "./firestore.service";
import { useEffect, useState } from "react";
import { Context } from "./context";
import UserInfo from "./components/UserInfo";

const App = () => {
  const auth = getAuth();
  const [authContext, setAuthContext] = useState({});
  const [unsubscribe, setUnsubscribe] = useState(null);

  const signOutUser = () => {
    unsubscribe();
    signOut(auth)
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthContext(user);
        createUser(user);
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
          <TodoList setUnsubscribe={setUnsubscribe} />
          <button onClick={signOutUser} id="sign-out">
            Sign out
          </button>
          <UserInfo />
        </main>
      ) : (
        <Login />
      )}
    </Context.Provider>
  );
};

export default App;
