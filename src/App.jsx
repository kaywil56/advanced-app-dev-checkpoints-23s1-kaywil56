import Login from "./components/Login";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import UserInfo from "./components/UserInfo";
import Groups from "./components/Groups";
import AuthContext from "./AuthContext";
import { TailSpin } from "react-loader-spinner";

const App = () => {
  const auth = getAuth();
  const [authContext, setAuthContext] = useState({});
  const [unsubscribe, setUnsubscribe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const signOutUser = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      if (user) {
        setAuthContext({ uid: user.uid, email: user.email });
        setIsLoading(false);
      } else {
        setAuthContext({});
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    console.log("isLoading")
    return (
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
  }
    
  // If the user is logged in
  if (authContext.uid) {
    return (
      <AuthContext.Provider value={{ authContext, setAuthContext }}>
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
      </AuthContext.Provider>
    );
  }

  return <Login setIsLoading={setIsLoading} />;
};

export default App;
