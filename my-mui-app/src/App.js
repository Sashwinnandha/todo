import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
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
      setTasks([...tasks, { text: input, completed: false }]);
      setInput('');
    }
  };

  const handleToggle = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

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
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'gray' : 'inherit',
              }}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggle(index)}
              />
              <ListItemText primary={task.text} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
