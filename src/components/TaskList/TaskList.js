import React from "react";
import "./tasklist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import TaskItem from "../TaskItem/TaskItem";

export default function TaskList({
  title,
  taskState,
  onAddTask,
  tasks,
  onTaskUpdate,
  onDeletTask
}) {
  const addTask = () => {
    onAddTask("Nova Tarefa", taskState);
  };

  return (
    <div className="tasklist">
      <div
        className={
          title === "Pendente"
            ? "title-pendente title"
            : "" || title === "Trabalhando"
            ? "title-trabalhando title"
            : "" || title === "Resolvida"
            ? "title-resolvida title"
            : ""
        }
      >
        {title}
      </div>
      <div className="content">
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              taskState={task.state}
              onTaskUpdate={onTaskUpdate}
              onDeletTask={onDeletTask}
            />
          );
        })}
      </div>
      <button className="btn btn-sm btn-light" onClick={addTask}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

TaskList.propTypes = {
  title: PropTypes.string.isRequired,
  onAddTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired
};
