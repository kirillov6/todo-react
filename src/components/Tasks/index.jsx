import React from 'react';

import './Tasks.scss';

import editIcon from '../../assets/icons/edit.svg';

const Tasks = ({ list }) => {

  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img
          src={editIcon}
          alt="Редактировать"
        />
      </h2>

      <div className="tasks__list">
        { list.tasks.map(task => (
          <div key={task.id} className="tasks__list__element">
            <div className="checkbox">
              <input id={`task-${task.id}`} type="checkbox"></input>
              <label htmlFor={`task-${task.id}`}>
              <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#b2b2b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </label>
            </div>
            <input readOnly type="text" value={task.text} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;