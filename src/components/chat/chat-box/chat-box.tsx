import React, { FC, useRef } from 'react';
import cnBind from 'classnames/bind';
import styles from './chat-box.module.scss';
import { useAppSelector, useScrollBottom } from 'shared/hooks';
import { Message } from 'entities/message';
import { Icon } from 'shared/ui';

const cx = cnBind.bind(styles);


export const ChatBox: FC = () => {
  const messageListRef = useRef<HTMLDivElement>(null);

  const { id: chatId } = useAppSelector(state => state.dialogSlice.currentDialog);
  const messagesMap = useAppSelector(state => state.messageSlice.messages);

  const messages = messagesMap[String(chatId)];

  

  if (messages) {
    useScrollBottom(messageListRef, messages);
  }
  return chatId ? (
    <div
      className={cx('chat-box', { 'chat-box--nomessages': messages.length <= 0 })}
      ref={messageListRef}
    >
      {messages && messages.length > 0 ? (
        messages.map(message => <Message key={message.id} {...message} />)
      ) : (
        <>
          <Icon className={cx('chat-box__placeholder-icon')} typeIcon="chat-placeholder" />
          <div className={cx('chat-box__placeholder')}>
            {'Вы не написали еще ни одного сообщения'}
          </div>
        </>
      )}
    </div>
  ) : null;
};
