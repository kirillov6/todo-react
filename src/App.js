import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, AddList, Tasks } from './components';


import listIcon from './assets/icons/list.svg';

function App() {

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/lists?_expand=color&_embed=tasks").then(({ data }) => {
      setLists(data);
    });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (list) => {
    const newLists = [...lists, list];
    setLists(newLists);
  }

  const onAddTask = (task) => {
    const newLists = lists.map((item) => {
      if (item.id === task.listId) {
        item.tasks = [...item.tasks, task];
      }
      return item;
    });
    setLists(newLists)
  }

  const onRemoveList = (id) => {
    const newLists = lists.filter(item => item.id !== id);
    setLists(newLists);
  }

  const onEditListTitle = (id, title) => {
    const newLists = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newLists);
  }

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List 
          items={[
            {
              icon: listIcon,
              name: "Все задачи",
              active: true
            }
          ]} 
        />

        {lists ? (
          <List
            items={lists}
            onRemove={onRemoveList}
            isRemovable
            onClick={item => {
              setActiveItem(item);
            }}
            activeItem={activeItem}
          />
        ) : (
          "Загрузка..."
        )}

        <AddList 
          colors={colors} 
          onAdd={onAddList} 
        />
      </div>

      <div className="todo__tasks">
        { lists && activeItem &&
          <Tasks
            list={activeItem}
            onEditTitle={onEditListTitle}
            onAddTask={onAddTask}
          />
        }
      </div>
    </div>
  );
};

export default App;
