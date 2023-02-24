import AddItem from "./components/AddItem";
import TodoList from "./components/TodoList";
import './App.css'

const App = () => {
  return (
    <>
      <h1>Todo List</h1>
      <TodoList />
      <AddItem />
    </>
  );
};

export default App;
