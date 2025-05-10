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

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
  if (input.trim()) {
    const newTask = { text: input, completed: false };
    axios.post('http://localhost:5000/tasks', newTask)
      .then(res => setTasks([...tasks, res.data]))
      .catch(err => console.error(err));
    setInput('');
  }
};

  const handleToggle = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    const status=updatedTasks[index].completed
    axios.post('http://localhost:5000/task', {index,status})
      .then(res => console.log(res))
      .catch(err => console.error(err));
    setTasks(updatedTasks);
  };

  const handleDelete=(index)=>{
    const newTasks=Object.values(tasks).filter((each,eachIndex)=>eachIndex!==index);
    axios.post('http://localhost:5000/taskid', {index})
      .then(res => console.log(res))
      .catch(err => console.error(err));
    setTasks(newTasks)
  }


  useEffect(() => {
  axios.get('http://localhost:5000/tasks')
    .then(res => setTasks(res.data))
    .catch(err => console.error(err));
}, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          To-Do List
        </Typography>

        <Box display="flex" gap={2} mb={3}>
          <TextField
            fullWidth
            label="New task"
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
            onClick={()=>handleDelete(index)}
            startIcon={<AddIcon />}
          >
            Delete
          </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
