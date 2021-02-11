import React, { useState } from "react";
import PropTypes from "prop-types";
import "./task-item.css";

export default function TaskItem({
  id,
  title,
  onDeletTask,
  taskState,
  onTaskUpdate
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);

  const onTitleChange = (event) => {
    const newTitle = event.target.value;
    setEditableTitle(newTitle);
    onTaskUpdate(id, newTitle, taskState);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      if (editableTitle.length === 0) {
        onDeletTask(id);
      }
    }
  };

  const buttonDeleteTask = (event) => {
    onDeletTask(id);
  };

  const onTaskStateChange = (event) => {
    onTaskUpdate(id, title, event.target.value);
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={editableTitle}
        onChange={onTitleChange}
        onKeyPress={onKeyPress}
      ></input>
    );
  } else {
    return (
      <div className="task-item">
        <div onClick={(e) => setIsEditing(true)}>{editableTitle}</div>
        <select value={taskState} onChange={onTaskStateChange}>
          <option value="Pendente">Pendente</option>
          <option value="Trabalhando">Trabalhando</option>
          <option value="Resolvida">Resolvida</option>
        </select>
        <button onClick={buttonDeleteTask}>Excluir</button>
      </div>
    );
  }
}

TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired
};
