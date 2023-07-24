import { RefObject, useEffect } from 'react';
import { InMessage } from 'shared/types/message.interface';

export function useScrollBottom(messageListRef: RefObject<HTMLDivElement>, messages: InMessage[]) {
  useEffect(() => {
    if (messageListRef && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);
}
