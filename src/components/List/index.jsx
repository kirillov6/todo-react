import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Badge from '../Badge';

import './List.scss';

import removeIcon from '../../assets/icons/remove.svg';

const List = ({ items, isRemovable, onClick, onRemove }) => {

  const removeListConfirm = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  }

  return (
    <ul className="list" onClick={onClick}>
      {
        items.map((item, index) => ( 
          <li key={index} className={classNames(item.className, {"active": item.active})}>
            <i>
              {
                item.icon ? <img src={ item.icon} alt={item.name} /> :
                <Badge color={item.color.name}/>
              }
            </i>

            <span>{item.name}</span>
              
            { isRemovable &&
              <img
                className="list__remove-btn"
                src={removeIcon}
                alt="Удалить элемент"
                onClick={() => removeListConfirm(item)}
              />
            }
          </li>
        ))}
    </ul>
  );
};

export default List;