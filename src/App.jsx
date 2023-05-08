import Login from "./components/Login";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import UserInfo from "./components/UserInfo";
import Groups from "./components/Groups";
import AuthContext from "./AuthContext";

const App = () => {
  const auth = getAuth();
  const [authContext, setAuthContext] = useState({});
  const [unsubscribe, setUnsubscribe] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const signOutUser = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthContext({ uid: user.uid, email: user.email });
      } else {
        setAuthContext({});
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authContext, setAuthContext }}>
      {authContext.uid ? (
        <>
          {" "}
          <header>
            <UserInfo />
            <h1>Todo</h1>
            <div>
              <button onClick={signOutUser} id="sign-out">
                Sign out
              </button>
            </div>
          </header>
          <Groups />
        </>
      ) : (
        <Login setIsLoading={setIsLoading} />
      )}
    </AuthContext.Provider>
  );
};

export default App;
