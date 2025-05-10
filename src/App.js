import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TuneIcon from '@mui/icons-material/Tune';
import Filter from './Filter.tsx';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [dialog,setDialog]=useState(false);
  const[date,setDate]=useState(new Date().toDateString());

  const handleAddTask = () => {
  if (input.trim()) {
    const date=new Date().toDateString();
    const newTask = { text: input, completed: false,date };
    axios.post('https://todo-backend-abxd.onrender.com/tasks', newTask)
      .then(res => setTasks([...tasks, res.data]))
      .catch(err => console.error(err));
    setInput('');
  }
};

  const handleToggle = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    const status=updatedTasks[index].completed
    axios.post('https://todo-backend-abxd.onrender.com/task', {index,status})
      .then(res => console.log(res))
      .catch(err => console.error(err));
    setTasks(updatedTasks);
  };

  const handleDelete=(index)=>{
    const newTasks=Object.values(tasks).filter((each,eachIndex)=>eachIndex!==index);
    axios.post('https://todo-backend-abxd.onrender.com/taskid', {index})
      .then(res => console.log(res))
      .catch(err => console.error(err));
    setTasks(newTasks)
  }

  const handleFilter=()=>{
    setDialog(prev=>!prev)
  }


  useEffect(() => {
  axios.get('https://todo-backend-abxd.onrender.com/tasks')
    .then(res => setTasks(res.data))
    .catch(err => console.error(err));
}, []);

  return (
    <>
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          To-Do Tracker
        </Typography>
         <Box display="flex" sx={{justifyContent:"space-between"}} gap={2} mb={1}>
          <b>{date}</b>
          <Button
            variant="text"
            color="primary"
            onClick={handleFilter}
            startIcon={<TuneIcon />}
          >
            Filters
          </Button>
         </Box>
        <Box display="flex" gap={2} mb={3}>
          <TextField
            fullWidth
            label="Add task"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>

        <List>
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              disablePadding
             
            >
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggle(index)}
              />
              <ListItemText primary={task.text}  sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'gray' : 'inherit',
              }} />
              <Button
            variant="contained"
            color="error"
             size="small"
            onClick={()=>handleDelete(index)}
            startIcon={<RemoveIcon />}
          >
            Delete
          </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
    {dialog&& <Filter dialog={dialog} setDialog={setDialog} />}
    </>
  );
}

export default App;
