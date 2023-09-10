import React, { FC, useEffect } from "react";
import styles from './record-time.module.scss';
import cnBind from 'classnames/bind';
import { useStopwatch } from 'components/chat/message-box/hooks/use-stopwatch';

const cx = cnBind.bind(styles);

export interface RecordTimerProps {
  microphoneButtonIsPressed: boolean;
}

export const RecordTimer: FC<RecordTimerProps> = ({microphoneButtonIsPressed}) => {
  const { resetTimer, startTimer, stopTimer, minutes, seconds, milliseconds, isRunning } =
    useStopwatch();

  useEffect(() => {
    microphoneButtonIsPressed ? startTimer() : resetTimer();
  }, []);

  return (
    <div className={cx('record-timer')}>
      <div className={cx({ "record-timer__indicator": milliseconds })}></div>
      <div className={cx('record-timer__display')}>
        {`${minutes < 10 ? '0' : ''}${minutes}:${
          seconds < 10 ? '0' : ''}${seconds}:${
          milliseconds < 10 ? '00' : milliseconds < 100 ? '0' : ''
        }${milliseconds}`}
      </div>
    </div>
  );
};
