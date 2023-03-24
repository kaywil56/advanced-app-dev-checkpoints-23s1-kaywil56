import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const Login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const login = () => {
    signInWithPopup(auth, provider)
  };
  return (
    <button id="login" onClick={login}>
      Login
    </button>
  );
};

export default Login;
