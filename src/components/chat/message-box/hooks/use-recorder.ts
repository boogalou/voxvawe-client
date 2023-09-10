import { useEffect, useState } from 'react';

export const useRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioData, setAudioData] = useState<Blob | null>(null);

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = evt => {
        const audioBlob = evt.data;
        setAudioData(audioBlob);
      };
    }
  }, [mediaRecorder]);

  const startRecording = async () => {
    setAudioData(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const options = { mimeType: 'audio/webm;codecs=opus' };
      const recorder = new MediaRecorder(mediaStream, options);

      recorder.start();
      setMediaRecorder(recorder);
    } catch (error) {
      console.error('Ошибка при захвате аудио', error);
    }
  };

  const stopRecord = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null); // Очистить mediaRecorder после остановки записи
    }
  };

  const cancelRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null); // Очистить mediaRecorder после отмены записи
    }
  };


  return {
    startRecording,
    stopRecord,
    cancelRecording,
    audioData, // Теперь вы можете использовать audioData в компоненте для работы с записанным аудио
  };
};
