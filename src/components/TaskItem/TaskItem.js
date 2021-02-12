import React, { useState } from "react";
import PropTypes from "prop-types";
import "./task-item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
      <div
        className={
          taskState === "Pendente"
            ? "task-item-pendente task-item"
            : "" || taskState === "Trabalhando"
            ? "task-item-trabalhando task-item"
            : "" || taskState === "Resolvida"
            ? "task-item-resolvida task-item"
            : ""
        }
      >
        <div onClick={(e) => setIsEditing(true)}>Título: {editableTitle}</div>
        <select
          className="form-select form-select-sm"
          value={taskState}
          onChange={onTaskStateChange}
        >
          <option value="Pendente">Pendente</option>
          <option value="Trabalhando">Trabalhando</option>
          <option value="Resolvida">Resolvida</option>
        </select>
        <hr />
        <button className="bt btn-sm btn-danger" onClick={buttonDeleteTask}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    );
  }
}

TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired
};
