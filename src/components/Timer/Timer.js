import styles from './Timer.module.scss'
import { useState, useEffect } from 'react';

const TimeElement = ({number, text}) => {
  return (
    <div className={styles.timeItem}>
      <div className={styles.number}>{number}</div>
      <div className={styles.text}>{text}</div>
    </div>
  )
}

export const Timer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const timeLeft = targetTime - now;

    if (timeLeft <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

    return {
      days,
      hours,
      minutes,
      seconds
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const isTimerCompleted = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className={styles.wrapper}>
      {isTimerCompleted ? (
        <div></div>
      ) : (
        <div className={styles.timeWrapper}>
          {
            timeLeft.days > 0
            && <TimeElement text={'DAYS'} number={timeLeft.days} />
          }
          {
            timeLeft.hours > 0
            && <TimeElement text={'HOURS'} number={timeLeft.hours} />
          }
          {
            timeLeft.minutes > 0
            && <TimeElement text={'MINUTES'} number={timeLeft.minutes} />
          }
          {
            timeLeft.seconds >= 0
            && <TimeElement text={'SECONDS'} number={timeLeft.seconds} />
          }
        </div>
      )}
    </div>
  );
};
