import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from '../List';
import Badge from '../Badge';

import './AddList.scss';

import addIcon from '../../assets/icons/add.svg';
import closeIcon from '../../assets/icons/close.svg';

const AddList = ({ colors, onAdd }) => {

  const [showedPopup, showPopup] = useState(false);
  const [selectedColor, selectColor] = useState();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const resetPopup = () => {
    showPopup(false);
    selectColor(colors[0].id);
    setInputValue('');
  }

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка')
      return;
    }

    setIsLoading(true);

    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectedColor
      })
      .then(({ data }) => {
        const color = colors.find(clr => clr.id === selectedColor).name;
        const listObj = { ...data, color: { name: color }};
        onAdd(listObj);
        resetPopup();
      })
      .catch(() => {
        alert("Ошибка при добавлении списка!")
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <div className="add-list">
      <List 
        items={[
          {
            icon: addIcon,
            name: "Добавить список",
            className: "add-list__button"
          }
        ]}
        onClick={() => showPopup(true)}
      />

      { showedPopup && 
        <div className="add-list__popup">
          <img 
            src={closeIcon} alt="Close button" 
            className="add-list__popup__close-btn"
            onClick={resetPopup}
          />

          <input 
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название списка"
          />

          <div className="add-list__popup__colors">
            {
              colors.map(clr => (
                <Badge 
                  key={clr.id} 
                  color={clr.name} 
                  onClick={() => selectColor(clr.id)}
                  className={selectedColor === clr.id && "active"}
                />
              ))
            }
          </div>

          <button 
            className="button"
            onClick={addList}
          >
            { isLoading ? "Добавление..." : "Добавить" }
          </button>
        </div>
      }
    </div>
    
  );
}

export default AddList;