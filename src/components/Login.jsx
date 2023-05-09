import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import Error from "./Error";

const Login = ({ setIsLoading }) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [showError, setShowError] = useState(false);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch {
      console.log("something went wrong");
    }
  };
  return (
    <>
      <button id="login" onClick={login}>
        Login
      </button>{" "}
      {showError ? (
        <Error
          errorMessage={"something went wrong"}
          setShowError={setShowError}
        />
      ) : null}{" "}
    </>
  );
};

export default Login;
