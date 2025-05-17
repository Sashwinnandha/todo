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
import socket from "./socket.js"

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

console.log(tasks)

  const handleToggle = (_id) => {
    const indexs = tasks.findIndex(e=>e._id===_id);
     const updatedTasks = [...tasks];
    updatedTasks[indexs].completed = !updatedTasks[indexs].completed;
    const status=updatedTasks[indexs].completed
    console.log(indexs)
    axios.post('https://todo-backend-abxd.onrender.com/task', {_id,status})
      .then(res => console.log(res))
      .catch(err => console.error(err));
    setTasks(updatedTasks);
  };

  const handleDelete=(_id)=>{
    const newTasks=tasks.filter((each)=>each._id!==_id);
    axios.post('https://todo-backend-abxd.onrender.com/taskid', {_id})
      .then(res => console.log(res))
      .catch(err => console.error(err));
    setTasks(newTasks)
  }

  const handleFilter=()=>{
    setDialog(prev=>!prev)
  }

useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data)
    });

    return () => socket.off('receive_message');
  }, []);

  const sendMessage = (e) => {
      console.log(e)
      socket.emit('send_message', { text: e });
      setInput(e);
  };

//   useEffect(() => {
//   axios.post('https://todo-backend-abxd.onrender.com/tasks',{date})
//     .then(res => setTasks(res.data))
//     .catch(err => console.error(err));
// }, [date]);

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
            onChange={(e) => sendMessage(e.target.value)}
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
                onChange={() => handleToggle(task._id)}
              />
              <ListItemText primary={task.text}  sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'gray' : 'inherit',
              }} />
              <Button
            variant="contained"
            color="error"
             size="small"
            onClick={()=>handleDelete(task._id)}
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
