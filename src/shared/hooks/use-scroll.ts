import { RefObject } from 'react';

export function useScroll(messageListRef: RefObject<HTMLDivElement>) {
  const scrollToBottom = () => {
    if (messageListRef && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  const scrollToTopThird = () => {
    if (messageListRef && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight / 3;
    }
  };

  return { scrollToBottom, scrollToTopThird };
}

