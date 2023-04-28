import { IMessage } from 'shared/types';
import { RefObject, useEffect } from 'react';

export function useScrollToBottom(messageListRef: RefObject<HTMLDivElement>, messages: IMessage[]) {
  useEffect(() => {
    if (messageListRef && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);
}
