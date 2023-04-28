import React, { FC, useRef } from 'react';
import cnBind from 'classnames/bind';
import styles from './chat-box.module.scss';
import { useAppSelector } from 'shared/hooks';
import { useScrollToBottom } from 'shared/hooks';
import { Message } from 'entities/message';

const cx = cnBind.bind(styles);

export const ChatBox: FC = () => {
  const messageListRef = useRef<HTMLDivElement>(null);

  const { messages } = useAppSelector(state => state.messageSlice);

  useScrollToBottom(messageListRef, messages);

  return (
    <div className={cx('chat-box')} ref={messageListRef}>
      {messages && messages.map(message => <Message key={message.id} {...message} />)}
    </div>
  );
};