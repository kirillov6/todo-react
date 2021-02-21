import React from 'react';
import axios from 'axios';

import './Task.scss';

import editIcon from '../../assets/icons/edit.svg';
import removeIcon from '../../assets/icons/remove.svg';

const Task = ({ task, onEdit, onRemove, onComplete, hideEditForm }) => {

  const onChangeCompleted = (e) => {

    const checked = e.target.checked;

    onComplete(task.listId, task.id, checked);

    axios.patch("http://localhost:3001/tasks/" + task.id, {
      completed: checked
    });
  }

  const removeTaskConfirm = () => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      onRemove();
      axios.delete("http://localhost:3001/tasks/" + task.id);
    }
  }

  return (
    <div key={task.id} className="task">
      <div className="checkbox">
        <input id={`task-${task.id}`} type="checkbox" onChange={onChangeCompleted} checked={task.completed}></input>
        <label htmlFor={`task-${task.id}`}>
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#b2b2b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </label>
      </div>
      <p>{task.title}</p>
      { !hideEditForm &&
        <div className="task__actions">
          <div>
            <img
              src={editIcon}
              alt="Редактировать"
              className="tasks__actions__edit-btn"
              onClick={() => onEdit(task)}
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
      }
    </div>
  );
}

export default Task;