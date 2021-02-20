import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, useHistory, useLocation } from 'react-router-dom';

import { List, AddList, Tasks } from './components';

import listIcon from './assets/icons/list.svg';

function App() {

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [editMode, setEditMode] = useState(false);

  let history = useHistory();

  // Неиспользуемая переменная. Без ее создания не получается отслеживать
  // изменение history.location.pathname в useEffect, скорее всего баг библиотеки.
  let location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:3001/lists?_expand=color&_embed=tasks").then(({ data }) => {
      setLists(data);
    });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  useEffect(() => {
    const listId = history.location.pathname.split("lists/")[1];
    if (lists) {
      const list = lists.find(lst => lst.id === Number(listId));
      setActiveItem(list);
    }
  }, [history.location.pathname, lists]);

  const onAddList = (list) => {
    const newLists = Array.isArray(lists) && lists.length ? [...lists, list] : [list];
    setLists(newLists);
  }

  const onAddTask = (task) => {
    const newLists = lists.map((item) => {
      if (item.id === task.listId) {
        item.tasks = Array.isArray(item.tasks) && item.tasks.length ? [...item.tasks, task] : [task];
      }
      return item;
    });
    setLists(newLists);
  }

  const onRemoveList = (id) => {
    const newLists = lists.filter(item => item.id !== id);
    setLists(newLists);
  }

  const onRemoveTask = (listId, taskId) => {
    const newLists = lists.map((list) => {
      if (list.id === listId)
        list.tasks = list.tasks.filter(task => task.id !== taskId);
      return list;
    });
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

  const changeEditMode = () => {
    setEditMode(!editMode);
  }

  return (
    <div className="todo">
      <div className="todo__sidebar" style={editMode ? {filter: "blur(3px)"} : null}>
        <List 
          items={[
            {
              icon: listIcon,
              name: "Все задачи",
              active: !activeItem
            }
          ]}
          onClick={() => {
            history.push("/");
          }}
          isLockedClicks={editMode}
        />

        {lists ? (
          <List
            items={lists}
            onRemove={onRemoveList}
            isRemovable
            isLockedClicks={editMode}
            onClick={item => {
              history.replace(`/lists/${item.id}`);
            }}
            activeItem={activeItem}
          />
        ) : (
          "Загрузка..."
        )}

        <AddList 
          colors={colors} 
          onAdd={onAddList}
          isLockedClicks={editMode}
        />
      </div>

      <div className="todo__tasks">
      <Route exact path="/">
          { lists &&
            lists.map(list => (
              <Tasks
                key={list.id}
                list={list}
                hideEditForm
                editMode={editMode}
                changeEditMode={changeEditMode}
                onEditTitle={onEditListTitle}
                onAddTask={onAddTask}
                //onEditTask={}
                onRemoveTask={onRemoveTask}
              />
            ))
          }
        </Route>
        <Route path="/lists/:id">
          { lists && activeItem &&
            <Tasks
              list={activeItem}
              editMode={editMode}
              changeEditMode={changeEditMode}
              onEditTitle={onEditListTitle}
              onAddTask={onAddTask}
              //onEditTask={}
              onRemoveTask={onRemoveTask}
            />
          }
        </Route>
      </div>
    </div>
  );
};

export default App;
