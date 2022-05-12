import { Button, List, ListItem, ListItemText, Modal } from '@mui/material';
import './Todo.css';
import db from '../firebase';
import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';

// TODO:
// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

const Todo = ({ todo }) => {
  // const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const updateTodo = async () => {
    // update the todo with the new input text
    await setDoc(doc(db, 'todos', todo.id), {
      todo: input,
      timestamp: new Date().getTime(),
    });
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div>
          {/* TODO: */}
          {/* <div className={classes.paper}> */}
          <h1>I'm a modal</h1>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={todo.todo}
          />
          <Button onClick={updateTodo} variant="contained" color="primary">
            Update Todo
          </Button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemText secondary="Todo" primary={todo.todo} />
        </ListItem>
        <button onClick={(e) => setOpen(true)}>Edit</button>
        <DeleteForeverIcon
          onClick={async (event) => {
            // delete the todo from the database
            await deleteDoc(doc(db, 'todos', todo.id));
          }}
        />
      </List>
    </>
  );
};

export default Todo;
