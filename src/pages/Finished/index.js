import React, { useState, useEffect } from 'react';

import { MdAccessTime, MdAssignmentTurnedIn, MdTimer } from 'react-icons/md';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';

import Template from '../../components/Template';
import ResultPanel from '../../components/ResultPanel';
import TaskTable from '../../components/TaskTable';

import Api from '../../services/firebase';

import { calcTime } from '../../util/helper';

function Finished() {
  const [list, setList] = useState(null);
  const [list2, setList2] = useState([]);
  const [timeWork, setTimeWork] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [averageTime, setAverageTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  function calcTimeWork(listTask) {
    if (listTask.length > 0) {
      let sumTimes = 0;

      listTask.forEach(task => {
        if (task.times) {
          task.times.forEach(el => {
            var difference_ms = el.finish - el.init;
            difference_ms = difference_ms / 1000;

            sumTimes += difference_ms;
          });
        }
      });

      setAverageTime(calcTime(sumTimes / listTask.length));
      setTimeWork(calcTime(sumTimes));
    }
  }

  useEffect(() => {
    async function getTasks() {
      Api.collection('tasks')
        .where('status', '==', 1)
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
          calcTimeWork(tasks);
        });
    }
    getTasks();
  }, []);

  return (
    <Template page="Tarefas Concluídas">
      <div id="content-wrapper">
        <Container fluid={true}>
          <Row>
            <ResultPanel
              title="Total de Tarefas Concluídas"
              value={list2.length}
              icon={<MdAssignmentTurnedIn size={50} />}
            />
            <ResultPanel
              title="Total de Horas Trabalhadas"
              value={`${timeWork.hours}:${timeWork.minutes}:${timeWork.seconds}`}
              icon={<MdTimer size={50} />}
            />
            <ResultPanel
              title="Tempo Médio"
              value={`${averageTime.hours}:${averageTime.minutes}:${averageTime.seconds}`}
              icon={<MdAccessTime size={50} />}
            />
          </Row>
        </Container>
        <TaskTable data={list} />
      </div>
    </Template>
  );
}

export default Finished;
