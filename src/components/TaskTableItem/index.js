import React, { useEffect, useState } from 'react';

import Button from 'muicss/lib/react/button';

import { calcTime } from '../../util/helper';

import Api from '../../services/firebase';

function TaskTableItem({ task }) {
  const [timeWork, setTimeWork] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  async function reopen() {
    var docTask = Api.collection('tasks').doc(task.id);
    let taskAux = await docTask.get();
    let taskData = taskAux.data();
    taskData.status = 0;
    docTask.set(taskData);
  }

  useEffect(() => {
    if (task.times) {
      let sumTimes = 0;
      task.times.forEach(el => {
        var difference_ms = el.finish - el.init;
        difference_ms = difference_ms / 1000;

        sumTimes += difference_ms;
      });

      setTimeWork(calcTime(sumTimes));
    }
  }, [task]);

  return (
    <tr>
      <td>{task.name}</td>
      <td>{`${timeWork.hours}:${timeWork.minutes}:${timeWork.seconds}`}</td>
      <td>
        <Button
          size="small"
          color="primary"
          onClick={reopen}
          style={{ margin: 0 }}
        >
          Reabrir
        </Button>
      </td>
    </tr>
  );
}

export default TaskTableItem;
