import React, { useState } from "react";
import "./styles.css";

import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";

let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };
    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  const deletTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id);
    });
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <TaskList
          title="Pendente"
          onAddTask={addTask}
          taskState="Pendente"
          tasks={tasks.filter((t) => t.state === "Pendente")}
          onTaskUpdate={updateTask}
          onDeletTask={deletTask}
        />

        <TaskList
          title="Trabalhando"
          onAddTask={addTask}
          taskState="Trabalhando"
          tasks={tasks.filter((t) => t.state === "Trabalhando")}
          onTaskUpdate={updateTask}
          onDeletTask={deletTask}
        />

        <TaskList
          title="Resolvida"
          onAddTask={addTask}
          taskState="Resolvida"
          tasks={tasks.filter((t) => t.state === "Resolvida")}
          onTaskUpdate={updateTask}
          onDeletTask={deletTask}
        />
      </div>
    </div>
  );
}
