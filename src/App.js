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
import { createDate } from './Helper.js';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [dialog,setDialog]=useState(false);
  const[date,setDate]=useState(createDate(new Date()));

  const handleAddTask = () => {
  if (input.trim()) {
    const newTask = { text: input, completed: false,date };
    axios.post('https://todo-backend-abxd.onrender.com/newtask', newTask)
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
    console.log(date)
  axios.post('https://todo-backend-abxd.onrender.com/tasks',{date})
    .then(res => setTasks(res.data))
    .catch(err => console.error(err));
}, [date]);

  return (
    <>
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          To-Do Tracker
        </Typography>
         <Box display="flex" sx={{justifyContent:"space-between"}} gap={2} mb={1}>
           <Box component="section" sx={{color:"#1976d2",fontWeight:"bold"}}>
          {date}
        </Box>
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
            disabled={input===""}
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
    {dialog&& <Filter dialog={dialog} setDialog={setDialog} setDate={setDate} />}
    </>
  );
}

export default App;
