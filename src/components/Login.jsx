import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const Login = ({ setIsLoading }) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const login = async () => {
    try{
      setIsLoading(true)
      await signInWithPopup(auth, provider)
    }catch{
      console.log("something went wrong")
    }finally{
      setIsLoading(false)
    }
  };
  return (
    <button id="login" onClick={login}>
      Login
    </button>
  );
};

export default Login;
