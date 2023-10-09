import { RefObject } from 'react';

export function useScroll(messageListRef: RefObject<HTMLDivElement>) {
  const scrollToBottom = () => {
    if (messageListRef && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }


  };

  const scrollToLastNewMessage = (limit: number) => {
    if (messageListRef && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight / 3;
    }
  };

  return { scrollToBottom, scrollToLastNewMessage  };
}

