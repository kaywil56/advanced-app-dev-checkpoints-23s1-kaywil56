import AddItem from "./components/AddItem";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Context } from "./context";

const App = () => {
  const auth = getAuth();
  const [authContext, setAuthContext] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthContext(user);
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
