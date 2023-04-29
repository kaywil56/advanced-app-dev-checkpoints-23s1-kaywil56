import { useEffect, useState, useContext } from "react";
import { deleteTodo, updateTodo } from "../firestore.service";
import { IoPencil, IoTrashSharp, IoSave } from "react-icons/io5";
import AuthContext from "../AuthContext";


const TodoItem = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState({ title: "", description: "" });
  const { authContext } = useContext(AuthContext)

  // Update todo object on user input
  const handleUpdate = async (e) => {
    e.preventDefault();
    updateTodo(editTodo, todo.id, authContext.uid, authContext.currentGroup);
    setIsEdit(false);
  };

  const updateInput = (e) => {
    setEditTodo({ ...editTodo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setEditTodo({ title: todo.title, description: todo.description });
  }, [todo]);

  return (
    <li className="todo-item">
      {isEdit ? (
        <form onSubmit={handleUpdate}>
          <input
            className="edit-inpts"
            onChange={updateInput}
            name="title"
            aria-label="title"
            placeholder={todo.title}
            value={editTodo.title}
            autoComplete="off"
          />
          <textarea
            className="edit-inpts"
            onChange={updateInput}
            name="description"
            aria-label="description"
            placeholder={todo.description}
            value={editTodo.description}
            autoComplete="off"
          />
          <button id="save-todo" type="submit">
            <IoSave style={{ color: "#333", fontSize: "1em" }} />
          </button>
        </form>
      ) : (
        <>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <div id="edit-del-cont">
            <button className="edit-del-btns" onClick={() => setIsEdit(true)}>
              <IoPencil style={{ color: "#333", fontSize: "1em" }} />
            </button>
            <button
              className="edit-del-btns"
              onClick={() => deleteTodo(todo.id, authContext.currentGroup)}
            >
              {" "}
              <IoTrashSharp style={{ color: "#333", fontSize: "1em" }} />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
