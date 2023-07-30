import React, { FC, useRef } from 'react';
import cnBind from 'classnames/bind';
import styles from './chat-box.module.scss';
import { useAppDispatch, useAppSelector, useScrollBottom } from 'shared/hooks';
import { Message, setMessageIsReadAsync } from "entities/message";
import { Icon } from 'shared/ui';
import { useSetMessageIsRead } from 'components/chat/chat-box/hooks/use-set-message-is-read';

const cx = cnBind.bind(styles);

export interface IViewedMessage {
  messageId: string | null;
  isRead: boolean;
}

export const ChatBox: FC = () => {

  const dispatch = useAppDispatch(); 
  const messageListRef = useRef<HTMLDivElement>(null);
  const { id: chatId } = useAppSelector(state => state.dialogSlice.currentDialog);
  const { account_id: accountId } = useAppSelector(state => state.userSlice.user);
  const messagesMap = useAppSelector(state => state.messageSlice.messages);

  const messages = messagesMap[String(chatId)];

  const handleIntersection: IntersectionObserverCallback  = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry?.isIntersecting) {
        const messageId = entry?.target.getAttribute('data-message-sender-id');
        if (!messageId?.startsWith(accountId)) {
          console.log(messageId);
         const modifiedMsgId = Number(messageId?.split(' ').at(1));

         messages.forEach((msg) => {
           if (msg.id === modifiedMsgId && !msg.is_read) {
             dispatch(setMessageIsReadAsync({chatId, messageId: modifiedMsgId }));
           }
         })
        }

        observer.unobserve(entry.target)
      }
    })
  };


  useSetMessageIsRead(
    handleIntersection,
    {
      root: messageListRef?.current,
      threshold: 0.5,
    },
    messages
  );



  if (messages) {
    useScrollBottom(messageListRef, messages);
  }




return chatId ? (
  <div
    className={cx('chat-box', { 'chat-box--nomessages': messages.length <= 0 })}
    ref={messageListRef}
  >
    {messages && messages.length > 0 ? (
      messages.map(message => (
        <Message key={message.id} {...message} />
      ))
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


// return chatId ? (
//   <div
//     className={cx('chat-box', { 'chat-box--nomessages': messages.length <= 0 })}
//     ref={messageListRef}
//   >
//     {messages && messages.length > 0 ? (
//       messages.map(message => (
//         <Message key={message.id} {...message} />
//       ))
//     ) : (
//       <>
//         <Icon className={cx('chat-box__placeholder-icon')} typeIcon="chat-placeholder" />
//         <div className={cx('chat-box__placeholder')}>
//           {'Вы не написали еще ни одного сообщения'}
//         </div>
//       </>
//     )}
//   </div>
// ) : null;