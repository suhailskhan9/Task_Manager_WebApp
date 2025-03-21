import React, { useState, useEffect } from "react";
import axios from "axios"
import '../styles/Dashboard.css'
import overViewIcon from '../assets/overViewIcon.png'
import statsIcon from '../assets/statsIcon.png'
import projectsIcon from '../assets/projectsIcon.png'
import chatIcon from '../assets/chatIcon.png'
import calendarIcon from '../assets/calendarIcon.png'
import profileImg from '../assets/profileImg.png'
import settingsIcon from '../assets/settingsIcon.png'
import logOutIcon from '../assets/logOutIcon.png'
import searchIcon from '../assets/searchIcon.png'
import groupImg from '../assets/groupImg.png'
import addImg from '../assets/addImg.png'
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal"; 
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [allTasks, setTasks] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskStatus, setTaskStatus] = useState("todo")

  const navigate = useNavigate();
  
  const openModal = (status) => {
    setTaskStatus(status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    axios.get("https://task-manager-webapp-8z5u.onrender.com/tasks") 
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

 
  const todoTasks = allTasks.filter(task => task.status === "todo");
  const inProgressTasks = allTasks.filter(task => task.status === "in-progress");
  const completedTasks = allTasks.filter(task => task.status === "completed");

  const handleLogout = () => {
    localStorage.removeItem("access_token"); 
    sessionStorage.removeItem("access_token");
    navigate("/login"); 
  };
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <nav>
        <h2 className="logo">.taskez</h2>
          <ul>
            <li className="sidebar-el"> <img src={overViewIcon} alt="" />Overview</li>
            <li className="sidebar-el"> <img src={statsIcon} alt="" /> Stats</li>
            <li className="active sidebar-el"><img src={projectsIcon} alt="" /> Projects</li>
            <li className="sidebar-el"> <img src={chatIcon} alt="" /> Chat</li>
            <li className="sidebar-el"> <img src={calendarIcon} alt="" /> Calendar</li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <p className="sidebar-el"><img src={settingsIcon}/> Setting</p>
          <p className="sidebar-el" onClick={handleLogout} style={{ cursor: "pointer" }}><img src={logOutIcon} alt="" /> Log Out</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="search-container">
          <img src={searchIcon} alt="" />
          <input type="text" placeholder=" Search" className="search-bar" />
          
          </div>
          <img src={groupImg} alt="" />
          <div className="profile">
            <span>Hi Saundarya</span>
            <img
              src={profileImg}
              alt="Profile"
              className="profile-img"
            />
          </div>
        </header>


        <section className="projects">
          <h2>Projects</h2>
          <div className="task-columns">
            <div className="task-column">
              <div>
                <h3>To Do <span className="task-count">{todoTasks.length}</span></h3>
              </div>
              
              <div className="add-task" onClick={() => openModal("todo")}>
                  <img src={addImg} alt="" />
              </div>
              
              {todoTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              
            </div>

            <div className="task-column">
              <div>
                  <h3>In Progress <span className="task-count">{inProgressTasks.length}</span></h3>
              </div>

              <div className="add-task" onClick={() => openModal("in-progress")}>
                  <img src={addImg} alt="" />
              </div>

              {inProgressTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
             
            </div>


            <div className="task-column">
              <div>
                <h3>Completed <span className="task-count">{completedTasks.length}</span></h3>
              </div>

              <div className="add-task" onClick={() => openModal("completed")}>
                  <img src={addImg} alt="" />
              </div>
              
              {completedTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}

            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      {isModalOpen && <TaskModal setTasks={setTasks} created_by = {"Suhail"} status={taskStatus} onClose={closeModal} />}
    </div>
  );
};

export default Dashboard;
