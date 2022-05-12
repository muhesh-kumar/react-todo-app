import { List, ListItem, ListItemText } from '@mui/material';
import './Todo.css';

const Todo = ({ text }) => {
  return (
    <List className="todo__list">
      <ListItem>
        <ListItemText secondary="Todo" primary={text} />
      </ListItem>
    </List>
  );
};

export default Todo;
