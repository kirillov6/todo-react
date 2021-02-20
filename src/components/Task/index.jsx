import React from 'react';
import axios from 'axios';

import './Task.scss';

import editIcon from '../../assets/icons/edit.svg';
import removeIcon from '../../assets/icons/remove.svg';

const Task = ({ id, title, onEdit, onRemove }) => {

  const editTask = () => {
    
  }

  const removeTaskConfirm = () => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      onRemove();
      axios.delete("http://localhost:3001/tasks/" + id);
    }
  }

  return (
    <div key={id} className="task">
      <div className="checkbox">
        <input id={`task-${id}`} type="checkbox"></input>
        <label htmlFor={`task-${id}`}>
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#b2b2b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </label>
      </div>
      <p>{title}</p>
      <div className="task__actions">
        <div>
          <img
            src={editIcon}
            alt="Редактировать"
            className="tasks__actions__edit-btn"
            onClick={editTask}
          />
        </div>
        <div>
          <img
            src={removeIcon}
            alt="Удалить"
            className="tasks__actions__remove-btn"
            onClick={removeTaskConfirm}
          />
        </div>
      </div>
    </div>
  );
}

export default Task;