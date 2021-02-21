import React, { useState } from 'react';
import axios from 'axios';

import EditForm from '../EditForm'
import Task from '../Task'

import './Tasks.scss';

import editIcon from '../../assets/icons/edit.svg';

const Tasks = ({ list, hideEditForm, editMode, changeEditMode, onEditTitle, onAddTask, onEditTask, onRemoveTask, onCompleteTask }) => {

  const [activeTaskId, setActiveTaskId] = useState(-1);
  const [activeTaskTitle, setActiveTaskTitle] = useState('');
  const [activeTaskText, setActiveTaskText] = useState('');

  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios.patch("http://localhost:3001/lists/" + list.id, {
        name: newTitle
      });
    }
  }

  const startEditTask = (task) => {
    setActiveTaskId(task.id);
    setActiveTaskTitle(task.title);
    setActiveTaskText(task.text);
    changeEditMode(2);
  }

  return (
    <div className="tasks">
      <div className="tasks__title">
        <h2 style={{color: list.color.hex}}>{list.name}</h2>
        { editMode === 0 &&
          <img
            src={editIcon}
            alt="Редактировать"
            className="tasks__title__edit-btn"
            onClick={editTitle}
          />
        }      
      </div>

      { editMode === 0 &&
        <div className="tasks__list">
          { list.tasks && 
            list.tasks.map(task => (
              <Task 
                key={task.id}
                task={task}
                onEdit={startEditTask}
                onRemove={() => onRemoveTask(list.id, task.id)}
                onComplete={onCompleteTask}
                hideEditForm={hideEditForm}
              />
          ))}
        </div>
      }

      { !hideEditForm &&
        <EditForm
          key={list.id}
          listId={list.id}
          taskId={activeTaskId}
          onAddTask={onAddTask}
          onEditTask={() => onEditTask(activeTaskId, list.id, activeTaskTitle, activeTaskText)}
          activeTaskTitle={activeTaskTitle}
          activeTaskText={activeTaskText}
          setActiveTaskTitle={setActiveTaskTitle}
          setActiveTaskText={setActiveTaskText}
          editMode={editMode}
          changeEditMode={changeEditMode}
        />
      }
    </div>
  );
}

export default Tasks;