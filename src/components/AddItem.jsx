import { useState, useContext } from "react";
import { createTodo } from "../firestore.service";
import { IoAddOutline } from "react-icons/io5";
import AuthContext from "../AuthContext";
import Error from "./Error";

const AddItem = () => {
  const [todo, setTodo] = useState({ description: "", title: "" });
  const { authContext } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);

  const updateInput = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      e.target.disabled = true;
      await createTodo(todo, authContext.uid, authContext.currentGroup);
      setTodo({ title: "", description: "" });
    } catch {
      setShowError(true);
    } finally {
      e.target.disabled = false;
    }
  };

  return (
    <>
      <form id="add-item" onSubmit={onSubmit}>
        <input
          className="add-todo-inpts"
          onChange={updateInput}
          aria-label="title"
          type="text"
          name="title"
          placeholder="Title"
          value={todo.title}
          autoComplete="off"
        />
        <textarea
          className="add-todo-inpts"
          onChange={updateInput}
          aria-label="description"
          id="description"
          type="text"
          name="description"
          placeholder="Description"
          value={todo.description}
          autoComplete="off"
        />
        <button id="create-todo" type="submit">
          <IoAddOutline style={{ color: "#fff", fontSize: "1.25em" }} />
        </button>
      </form>
      {showError ? (
        <Error
          errorMessage={"something went wrong"}
          setShowError={setShowError}
        />
      ) : null}
    </>
  );
};

export default AddItem;
