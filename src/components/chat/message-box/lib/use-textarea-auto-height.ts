import { useEffect, useRef } from 'react';



export const useResizeTextarea = (value: string) => {

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  function resizeTextarea(textarea: HTMLTextAreaElement) {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }

  useEffect(() => {
    resizeTextarea(textAreaRef.current!);
  }, [value]);

  return textAreaRef;
};

