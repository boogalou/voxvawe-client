import React, { FC, useEffect, useRef, useState } from "react";
import cnBind from 'classnames/bind';
import styles from './vice-message.module.scss';
import { IVoiceMessageData } from 'shared/types';
import { WaveformVisualizer } from 'entities/message/wave-form-visualizer';
import { IconButton } from 'shared/ui';

const cx = cnBind.bind(styles);

export interface IVoiceMessageProps extends IVoiceMessageData {}

export const VoiceMessage: FC<IVoiceMessageProps> = ({ duration, link_ogg, waveform }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playButtonIsPressed, setPlayButtonIsPressed] = useState<boolean>(false);
  const [currentTimeAudioFile, setCurrentTimeAudioFile] = useState<number>(0)
  const [durationAudioFile, setDurationAudioFile] = useState<number>(0)

  const playButtonClickHandler = async () => {
    if (audioRef.current) {
      if (playButtonIsPressed) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
    }

    setPlayButtonIsPressed(prevState => !prevState);
  };

  const loadMetaDataHandler = () => {
    if (audioRef.current) {
      setCurrentTimeAudioFile(audioRef.current.currentTime);
      setDurationAudioFile(audioRef.current.duration)
    }
  }

  const updateCurrentTimeHandler = () => {
    if (audioRef.current) {
      setCurrentTimeAudioFile(audioRef.current?.currentTime);
    }
}

  useEffect(() => {
    if (audioRef.current) {
      if ( audioRef.current.ended)
      setPlayButtonIsPressed(prevState => !prevState);
    }
  }, [audioRef.current?.ended]);

  return (
    <div className={cx('voice')}>
      <div className={cx('voice__control')}>
        <IconButton
          className={cx('voice__button-play')}
          typeIcon={playButtonIsPressed ? 'pause' : 'play'}
          onClick={playButtonClickHandler}
        />
      </div>

      <WaveformVisualizer
        waveform={waveform}
        svgWidth={300}
        svgHeight={30}
        currentTime={currentTimeAudioFile}
        duration={durationAudioFile}
      />



      <audio onLoadedMetadata={loadMetaDataHandler} onTimeUpdate={updateCurrentTimeHandler} ref={audioRef} src={link_ogg} />
    </div>
  );
};
