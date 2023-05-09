import TodoItem from "./TodoItem";
import { useEffect, useState, useContext } from "react";
import { getTodos } from "../firestore.service";
import AuthContext from "../AuthContext";
import Error from "./Error";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const { authContext, setAuthContext } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);

  const handleGoBack = () => {
    setAuthContext({
      uid: authContext.uid,
      email: authContext.email,
      currentGroup: null,
    });
  };

  useEffect(() => {
    const get = async () => {
      try {
        await getTodos(setTodos, authContext);
      } catch (e) {
        console.log(e);
        setShowError(true);
      }
    };
    get();
  }, []);

  return (
    <>
      <button id="back-btn" onClick={() => handleGoBack()}>
        BACK
      </button>
      <ul>
        {todos.map((todo, idx) => {
          return <TodoItem key={idx} todo={todo} />;
        })}
      </ul>
      {showError ? (
        <Error
          errorMessage={"something went wrong"}
          setShowError={setShowError}
        />
      ) : null}
    </>
  );
};

export default TodoList;
