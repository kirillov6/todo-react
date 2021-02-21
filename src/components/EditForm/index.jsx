import React, { useState } from 'react';
import axios from 'axios';

import './EditForm.scss';

import addIcon from '../../assets/icons/add.svg';

const EditForm = ({ listId, taskId, onAddTask, onEditTask, activeTaskTitle, activeTaskText, setActiveTaskTitle, setActiveTaskText, editMode, changeEditMode }) => {

  const [isLoading, setIsLoading] = useState(false);

  const toggleFormMode = (mode) => {
    changeEditMode(mode);
    setActiveTaskTitle('');
    setActiveTaskText('');
  }

  const addTask = () => {

    if (!activeTaskTitle)
      return alert("Укажите заголовок задачи!");

    const task = {
      listId: listId,
      title: activeTaskTitle,
      text: activeTaskText,
      completed: false
    };

    setIsLoading(true);

    axios
      .post('http://localhost:3001/tasks', task)
      .then(({ data }) => {
        onAddTask(data);
        toggleFormMode(0);
      })
      .catch((e) => {
        alert("Ошибка при добавлении задачи: " + e.message)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const editTask = () => {

    if (!activeTaskTitle)
      return alert("Укажите заголовок задачи!");

    onEditTask();
    toggleFormMode(0);

    axios.patch("http://localhost:3001/tasks/" + taskId, {
      title: activeTaskTitle,
      text: activeTaskText
    });
  }

  return (
    <div className="form">
      { (editMode === 0) ? (
        <div 
          className="form-new"
          onClick={() => toggleFormMode(1)}
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
            value={activeTaskTitle}
            onChange={e => setActiveTaskTitle(e.target.value)}
          />

          <textarea
            className="field"
            rows="10"
            placeholder="Текст задачи"
            value={activeTaskText}
            onChange={e => setActiveTaskText(e.target.value)}
          />

          { editMode === 1 &&
            <button 
              className="button"
              onClick={addTask}
              disabled={isLoading}
            >
              { isLoading ? "Добавление задачи..." : "Добавить задачу" }  
            </button>
          }

          { editMode === 2 &&
            <button 
              className="button"
              onClick={editTask}
            >
              Сохранить изменения
            </button>
          }

          <button 
            className="button button--grey"
            onClick={() => toggleFormMode(0)}
          >
            Отмена
          </button>
        </div> )
      }
    </div>
  );
}

export default EditForm;