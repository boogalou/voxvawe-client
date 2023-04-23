import React, {FC, useEffect, useRef} from 'react';
import cnBind from 'classnames/bind';
import styles from './chat-box.module.scss'
import {Message} from "@/entities/message";
import {useAppSelector} from "@/shared";

const cx = cnBind.bind(styles);

export const ChatBox: FC = () => {

  const messageListRef = useRef<HTMLDivElement>(null);


  const messages = useAppSelector((state) => state.messageSlice.messages);

  useEffect(() => {
   if (messageListRef && messageListRef.current) {
     messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
   }
  }, [messages]);

  return (
      <div
          className={cx('chat-box')}
          ref={messageListRef}
      >
        {
          messages.map(message => (
              <Message
                  key={message.id}
                  {...message}
              />
          ))
        }

      </div>
  );
};