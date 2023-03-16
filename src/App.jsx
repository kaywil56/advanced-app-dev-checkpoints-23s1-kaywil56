import AddItem from "./components/AddItem";
import TodoList from "./components/TodoList";

const App = () => {
  return (
      <main>
        <h1>Todo</h1>
        <AddItem />
        <TodoList />
      </main>
  );
};

export default App;
