import React from 'react';
import axios from 'axios';

import EditForm from '../EditForm'
import Task from '../Task'

import './Tasks.scss';

import editIcon from '../../assets/icons/edit.svg';

const Tasks = ({ list, hideEditForm, editMode, changeEditMode, onEditTitle, onAddTask, onEditTask, onRemoveTask }) => {

  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios.patch("http://localhost:3001/lists/" + list.id, {
        name: newTitle
      });
    }
  }

  return (
    <div className="tasks">
      <div className="tasks__title">
        <h2 style={{color: list.color.hex}}>{list.name}</h2>
        { !editMode &&
          <img
            src={editIcon}
            alt="Редактировать"
            className="tasks__title__edit-btn"
            onClick={editTitle}
          />
        }      
      </div>

      { !editMode &&
        <div className="tasks__list">
          { list.tasks && 
            list.tasks.map(task => (
              <Task 
                key={task.id}
                {...task}
                onEdit={onEditTask}
                onRemove={() => onRemoveTask(list.id, task.id)}
              />
          ))}
        </div>
      }

      { !hideEditForm &&
        <EditForm
          key={list.id}
          list={list}
          onAddTask={onAddTask}
          editMode={editMode}
          changeEditMode={changeEditMode}
        />
      }
    </div>
  );
}

export default Tasks;