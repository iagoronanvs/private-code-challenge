import React, { useState, useEffect } from 'react';

import Button from 'muicss/lib/react/button';

import { MdAdd } from 'react-icons/md';

import Template from '../../components/Template';
import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';

import Api from '../../services/firebase';

import empty from '../../assets/img/empty.svg';

function App({ history }) {
  const [isVisible, setVisible] = useState(false);
  const [list, setList] = useState(null);
  const [list2, setList2] = useState([]);
  const [task, setTask] = useState(null);

  function getTasks() {
    Api.collection('tasks')
      .where('status', '==', 0)
      .orderBy('createdAt', 'asc')
      .onSnapshot(async res => {
        setList([]);
        let tasks = [];
        res.docs.map(doc => {
          var task = doc.data();
          task.id = doc.id;
          tasks.push(task);
          return true;
        });
        setList(tasks);
        setList2(tasks);
      });
  }

  function selectItem(item) {
    setTask(item);
    setVisible(true);
  }

  function add() {
    setTask(null);
    setVisible(true);
  }

  function cancel() {
    setTask(null);
    setVisible(false);
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Template page="Tarefas" number={list2.length} history={history}>
      {list && list.length === 0 && (
        <div id="content-wrapper-center">
          <div className="empty">
            <img src={empty} alt="empty" style={{ width: 120 }} />
            <p className="text-center">Nenhuma tarefa cadastrada no momento.</p>
          </div>
        </div>
      )}
      {list && list.length > 0 && (
        <div id="content-wrapper">
          <TaskList data={list} selectItem={item => selectItem(item)} />
        </div>
      )}

      <Button className="fab-add" variant="fab" color="primary" onClick={add}>
        <MdAdd size={25} />
      </Button>

      <TaskForm
        isVisible={isVisible}
        onCancel={cancel}
        title="Adicionar Tarefa"
        task={task}
      />
    </Template>
  );
}

export default App;
