import DeleteItem from "./DeleteItem";

const TodoItem = ({ todo }) => {
  return (
    <li>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <DeleteItem uid={todo.id} />
    </li>
  );
};

export default TodoItem;
