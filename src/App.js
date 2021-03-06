import './App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Todo from './componenets/Todo';
import db from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { query, orderBy } from 'firebase/firestore';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  // this code here fires when app loads
  useEffect(() => {
    const getTodosFromFireStore = async () => {
      // get all documents from a collection
      const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, todo: doc.data().todo });
      });
      setTodos(todos);
    };

    getTodosFromFireStore();
  }, []);

  const addTodo = (event) => {
    event.preventDefault(); // don't refresh the page when you submit

    const currentTime = new Date().getTime();

    const addTodoToFireStore = async () => {
      // Add a new document in collection "todos" with a name of ${input}
      await addDoc(collection(db, 'todos'), {
        todo: input,
        timestamp: currentTime,
      });
    };

    addTodoToFireStore();
    setTodos([...todos, { todo: input, timestamp: currentTime }]);
    setInput(''); // clear the input field afte submitting
  };

  return (
    <div className="App">
      <h1>React To Do App</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          ></Input>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
          disabled={!input} // if input is empty disable the button
        >
          Add To Do
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default App;
