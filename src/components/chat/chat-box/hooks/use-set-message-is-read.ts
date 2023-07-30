import { useEffect } from "react";


export function useSetMessageIsRead(callback: IntersectionObserverCallback, options: { [key: string]: unknown }, deps: unknown) {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    const messageElements = document.querySelectorAll('[data-message-sender-id]')

    messageElements.forEach(msgItem => observer.observe(msgItem))


    return () => observer.disconnect();
// массив сообщений
  }, [deps]);
}