import React, { useState } from "react";
import axios from "axios";
import "../styles/TaskModal.css" 

const TaskModal = ({setTasks, created_by, status, onClose }) => {
   const [task, setTask] = useState({
    title: "",
    description: "",
    status: status,
  });
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };


  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token"); 
      
      if (!token) {
        console.error("No token found, user must log in first.");
        return;
      }
  
      const response = await axios.post(
        "http://127.0.0.1:8000/add_task",
        task,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in request headers
            "Content-Type": "application/json",
          },
        }
      );
  
      setTasks(prevTasks => [...prevTasks, response.data]);
      onClose(); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Task</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Add Task</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskModal;
