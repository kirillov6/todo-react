import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, AddList, Tasks } from './components';


import listIcon from './assets/icons/list.svg';

function App() {

  // DB.lists.map(item => {
  //   item.color = DB.colors.find(color => color.id === item.colorId).name;
  //   return item;
  // })

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

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

  const onRemoveList = (id) => {
    const newLists = lists.filter(item => item.id !== id);
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
        { lists &&
          <Tasks
            list={lists[1]}
          />
        }
      </div>
    </div>
  );
};

export default App;
