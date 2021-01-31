import React, { useState } from 'react';
import axios from 'axios';

import './EditForm.scss';

import addIcon from '../../assets/icons/add.svg';

const EditForm = ({ list, onAddTask }) => {

  const [formMode, setFormMode] = useState(false);
  const [taskTitleValue, setTaskTitleValue] = useState('');
  const [taskTextValue, setTaskTextValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleFormMode = () => {
    setFormMode(!formMode);
    setTaskTitleValue('');
    setTaskTextValue('');
  }

  const addTask = () => {
    const task = {
      listId: list.id,
      title: taskTitleValue,
      text: taskTextValue,
      completed: false
    };

    setIsLoading(true);

    axios
      .post('http://localhost:3001/tasks', task)
      .then(({ data }) => {
        onAddTask(data);
        toggleFormMode();
      })
      .catch(() => {
        alert("Ошибка при добавлении задачи!")
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <div className="form">
      { !formMode ? (
        <div 
          className="form-new"
          onClick={toggleFormMode}
        >
          <img 
              src={addIcon} 
              alt="Add button"
          />
          <span>Новая задача</span>
        </div> ) : (
        <div className="form-edit">
          <input 
            className="field"
            type="text"
            placeholder="Заголовок задачи"
            value={taskTitleValue}
            onChange={e => setTaskTitleValue(e.target.value)}
          />

          <textarea
            className="field"
            rows="10"
            placeholder="Текст задачи"
            value={taskTextValue}
            onChange={e => setTaskTextValue(e.target.value)}
          />

          <button 
            className="button"
            onClick={addTask}
            disabled={isLoading}
          >
            { isLoading ? "Добавление задачи..." : "Добавить задачу" }  
          </button>

          <button 
            className="button button--grey"
            onClick={toggleFormMode}
          >
            Отмена
          </button>
        </div> )
      }
    </div>
  );
}

export default EditForm;