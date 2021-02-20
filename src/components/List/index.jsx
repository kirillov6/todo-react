import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Badge from '../Badge';

import './List.scss';

import removeIcon from '../../assets/icons/remove.svg';

const List = ({ items, isRemovable, onClick, onRemove, activeItem, isLockedClicks }) => {

  const removeListConfirm = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  }

  return (
    <ul className="list">
      {
        items.map((item, index) => ( 
          <li 
            key={index} 
            className={classNames(item.className, { active: item.active ? item.active : activeItem && activeItem.id === item.id })}
            onClick={(!isLockedClicks && onClick) ? () => onClick(item) : null}
          >
            <i>
              {
                item.icon ? <img src={item.icon} alt={item.name} /> :
                <Badge color={item.color.name}/>
              }
            </i>

            <span>
              {item.name}
              {isRemovable && ` (${item.tasks ? item.tasks.length : 0})`}
            </span>
              
            { isRemovable && !isLockedClicks &&
              <img
                className="list__remove-btn"
                src={removeIcon}
                alt="Удалить элемент"
                onClick={!isLockedClicks ? () => removeListConfirm(item) : null}
              />
            }
          </li>
        ))}
    </ul>
  );
};

export default List;