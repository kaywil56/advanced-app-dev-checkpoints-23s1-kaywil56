import { useEffect, useState } from "react";
import { deleteTodo, updateTodo } from "../firestore.service";
import { IoPencil, IoTrashSharp, IoSave } from "react-icons/io5";

const TodoItem = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState({ title: "", description: "" });

  // Update todo object on user input
  const handleUpdate = async (e) => {
    e.preventDefault();
    updateTodo(editTodo, todo.id);
    setIsEdit(false);
  };

  const updateInput = (e) => {
    setEditTodo({ ...editTodo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setEditTodo({ title: todo.title, description: todo.description });
  }, [todo]);

  return (
    <li>
      {isEdit ? (
        <form onSubmit={handleUpdate}>
          <input
            className="edit-inpts"
            onChange={updateInput}
            name="title"
            aria-label="title"
            placeholder={todo.title}
            value={editTodo.title}
            autocomplete="off"
          />
          <textarea
            className="edit-inpts"
            onChange={updateInput}
            name="description"
            aria-label="description"
            placeholder={todo.description}
            value={editTodo.description}
            autocomplete="off"
          />
          <button id="save-todo" type="submit">
            <IoSave style={{ color: "#333", fontSize: "1em" }}/>
          </button>
        </form>
      ) : (
        <>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <div id="edit-del-cont">
            <button className="edit-del-btns" onClick={() => setIsEdit(true)}>
              <IoPencil style={{ color: "#333", fontSize: "1em" }} />
            </button>
            <button
              className="edit-del-btns"
              onClick={() => deleteTodo(todo.id)}
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
