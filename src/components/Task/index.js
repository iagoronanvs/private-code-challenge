import React, { useState, useEffect } from 'react';

import Panel from 'muicss/lib/react/panel';
import Button from 'muicss/lib/react/button';

import { MdQueryBuilder, MdPlayArrow, MdPause } from 'react-icons/md';

import Api from '../../services/firebase';

import { useInterval, calcTime } from '../../util/helper';

const Task = ({ id, name, times, onSelect }) => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [delay] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(nextSecond, isRunning ? delay : null);

  function nextSecond() {
    let sec = parseInt(seconds) + 1;

    if (sec < 60) {
      setSeconds(sec < 10 ? `0${sec}` : sec);
    } else {
      let min = parseInt(minutes) + 1;
      setSeconds('00');

      if (min < 60) {
        setMinutes(min < 10 ? `0${min}` : min);
      } else {
        let hor = parseInt(hours) + 1;

        setMinutes('00');
        setHours(hor < 10 ? `0${hor}` : hor);
      }
    }
  }

  async function finish() {
    var docTask = Api.collection('tasks').doc(id);
    let task = await docTask.get();
    let taskData = task.data();
    taskData.status = 1;
    docTask.set(taskData);
  }

  async function play() {
    let docTask = Api.collection('tasks').doc(id);
    let task = await docTask.get();
    let taskData = task.data();

    let arrTimes = taskData.times ? taskData.times : [];

    if (
      arrTimes.length === 0 ||
      (arrTimes.length > 0 && arrTimes[arrTimes.length - 1].finish != null)
    ) {
      arrTimes.push({ init: Date.now(), finish: null });
      taskData.times = arrTimes;
      docTask.set(taskData);
    }

    setIsRunning(true);
  }

  async function stop() {
    let docTask = Api.collection('tasks').doc(id);
    let task = await docTask.get();
    let taskData = task.data();

    if (
      taskData.times.length > 0 &&
      taskData.times[taskData.times.length - 1].finish === null
    ) {
      taskData.times[taskData.times.length - 1].finish = Date.now();
      docTask.set(taskData);
    }

    setIsRunning(false);
    calcDiff(taskData.times);
  }

  function calcDiff(arrTimes = null) {
    let sumTimes = 0;
    if (times && !arrTimes) {
      times.forEach(el => {
        let finish = 0;
        if (!el.finish) finish = Date.now();

        var difference_ms =
          finish !== 0 ? finish - el.init : el.finish - el.init;
        difference_ms = difference_ms / 1000;

        sumTimes += difference_ms;
      });
    }

    if (arrTimes) {
      arrTimes.forEach(el => {
        var difference_ms = el.finish - el.init;
        difference_ms = difference_ms / 1000;

        sumTimes += difference_ms;
      });
    }

    let timer = calcTime(sumTimes);
    setSeconds(timer.seconds);
    setMinutes(timer.minutes);
    setHours(timer.hours);

    if (
      times &&
      !arrTimes &&
      times.length > 0 &&
      times[times.length - 1].finish == null
    )
      setIsRunning(true);
  }

  useEffect(() => {
    calcDiff();
  }, []);

  return (
    <Panel className={isRunning && 'task-active'}>
      <div
        className={
          isRunning
            ? 'mui--text-subhead task-tilte truncate task-text-active'
            : 'mui--text-subhead task-tilte truncate'
        }
        onClick={onSelect}
      >
        {name}
      </div>
      <div className="task-footer">
        <div className="task-data">
          <div className="task-time">
            <MdQueryBuilder size={15} className="icon" />
            {`${hours}:${minutes}:${seconds}`}
          </div>

          <div className="footer-buttons">
            <Button
              className="task-button"
              size="small"
              variant="raised"
              color="primary"
              onClick={finish}
              disabled={isRunning}
            >
              Concluir
            </Button>

            <div>
              <Button
                size="small"
                color="primary"
                variant="flat"
                className="button-icon"
                onClick={stop}
                disabled={!isRunning}
              >
                <MdPause className="task-icon-button" size={20} />
              </Button>

              <Button
                size="small"
                color="primary"
                variant="flat"
                className="button-icon"
                onClick={play}
                disabled={isRunning}
              >
                <MdPlayArrow className="task-icon-button" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default Task;
