import './App.css';
import { useState } from 'react';
import { useEffect,useRef } from 'react';
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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import Filter from './Filter.tsx';
import { createDate } from './Helper.js';
import socket from "./socket.js"
import { Toast } from 'primereact/toast';
import dayjs from 'dayjs';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [dialog,setDialog]=useState(false);
  const[date,setDate]=useState(createDate(new Date()));
  const[msg,setMsg]=useState("");
  const toast = useRef(null);

  // console.log("count",tasks)

  const showAlert=(severity,summary,detail)=>{
    toast.current.show({ severity: severity, summary: summary, detail: detail});
  }

  const handleAddTask = () => {
  if (input.trim()) {
    const newTask = { text: input, completed: false,date };
    // socket.emit("newtask",{ text: input, completed: false,date});
    // socket.off("tasksAdded");
    // socket.on("tasksAdded",(data)=>{
    //   console.log(data)
    //   showAlert(data.severity,data.summary,data.detail)
    //   setTasks(data.data)
    // })
    
    // // socket.on("tasks",(data)=>{
    // //   setTasks(data)
    // // })
    axios.post('https://todo-backend-abxd.onrender.com/newtask', newTask)
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
    setInput('');
  }
};

  const handleDate=(direction)=>{
    switch (direction){
      case "left":{
          const tomorrow = dayjs(date, 'DD-MMM-YYYY').toDate();
          setDate(createDate(new Date(tomorrow.setDate(tomorrow.getDate() -1))));
          break;
      }
      case "right":{
          const tomorrow = dayjs(date, 'DD-MMM-YYYY').toDate();
          setDate(createDate(new Date(tomorrow.setDate(tomorrow.getDate() +1))));
          break;
      }
      default:{
        return;
      }
    }

  }



const parsed = dayjs(date, 'DD-MMM-YYYY');
console.log(parsed.toDate()); // ✅ Reliable Date object

  const handleToggle = (_id) => {
    const indexs = tasks.findIndex(e=>e._id===_id);
     const updatedTasks = [...tasks];
    updatedTasks[indexs].completed = !updatedTasks[indexs].completed;
    const status=updatedTasks[indexs].completed
    // socket.emit("update",{_id,status,date})
    axios.post('https://todo-backend-abxd.onrender.com/task', {_id,status,date})
      .then(res => {
        console.log(res.data)
        setTasks(res.data)
  })
      .catch(err => console.error(err));
    // socket.on("tasks",(data)=>{
    //   setTasks(data)
    // })
  };

  const handleDelete=(_id)=>{
    // const newTasks=tasks.filter((each)=>each._id!==_id);
    //socket.emit("delete",{_id,date})
    axios.post('https://todo-backend-abxd.onrender.com/taskid', {_id,date})
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
    // socket.on("tasks",(data)=>{
    //       setTasks(data)
    // })

  }

  const handleFilter=()=>{
    setDialog(prev=>!prev)
  }

// useEffect(() => {
//     socket.on('receive_message', (data) => {
//       console.log(data)
//     });

//     return () => socket.off('receive_message');
//   }, []);

  // const sendMessage = (e) => {
  //     console.log(e)
  //     socket.emit('send_message', { text: e });
  //     setInput(e);
  // };

  useEffect(() => {
    axios.post('https://todo-backend-abxd.onrender.com/tasks',{date})
    .then(res => setTasks(res.data))
    .catch(err => console.error(err));
  },[date])

  return (
    <>
    <Toast ref={toast} />
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          To-Do Tracker
        </Typography>
         <Box display="flex" sx={{justifyContent:"space-around"}} gap={2} mb={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={()=>handleDate("left")}
            startIcon={<ChevronLeftIcon />}
          >
          </Button>
           <Box component="section" sx={{color:"#1976d2",fontWeight:"bold",fontSize:"20px",alignSelf:"center"}}>
          {date}
        </Box>
        <Button
            variant="contained"
            color="primary"
            onClick={()=>handleDate("right")}
            startIcon={<ChevronRightIcon />}
            disabled={date===createDate(new Date())}
          >
          </Button>
          
         </Box>
         <Box display="flex" sx={{justifyContent:"end"}}>
          <Button
            variant="text"
            color="primary"
            onClick={handleFilter}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
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
