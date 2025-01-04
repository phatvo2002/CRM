import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ViecCanlam = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    if (editingIndex !== null) {
      // Chỉnh sửa task
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      // Thêm task mới
      setTasks([...tasks, { text: newTask, completed: false }]);
    }
    setNewTask("");
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setNewTask(tasks[index].text);
    setEditingIndex(index);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Việc Cần Làm
      </Typography>
      <TextField
        label="Thêm công việc"
        variant="outlined"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTask}
        fullWidth
      >
        {editingIndex !== null ? "Cập nhật công việc" : "Thêm công việc"}
      </Button>

      <List sx={{ mt: 3 }}>
        {tasks.map((task, index) => (
          <ListItem key={index} divider>
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <ListItemText
              primary={task.text}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditTask(index)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTask(index)}
              >
                <Delete />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ViecCanlam;
