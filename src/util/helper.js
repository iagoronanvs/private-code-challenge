import { useRef, useEffect } from 'react';

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export const calcTime = sumTimes => {
  var sec = Math.floor(sumTimes % 60);
  sumTimes = sumTimes / 60;
  var min = Math.floor(sumTimes % 60);
  sumTimes = sumTimes / 60;
  var hor = Math.floor(sumTimes % 24);
  var days = Math.floor(sumTimes / 24);

  hor += days * 24;

  if (hor < 10) hor = `0${hor}`;
  if (min < 10) min = `0${min}`;
  if (sec < 10) sec = `0${sec}`;

  return { hours: hor, minutes: min, seconds: sec };
};
