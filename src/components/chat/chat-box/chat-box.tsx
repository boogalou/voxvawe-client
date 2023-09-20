import React, { FC, useEffect, useRef } from "react";
import cnBind from 'classnames/bind';
import styles from './chat-box.module.scss';
import { useAppDispatch, useAppSelector, useScroll } from "shared/hooks";
import { Icon } from 'shared/ui';
import { useSetMessageIsRead } from './hooks/use-set-message-is-read';
import { setMessageIsReadAsync } from 'entities/dialog';
import { getLatestMessagesAsync, Message } from 'entities/message';
import { useInfiniteScrollMessageHistory } from 'components/chat/chat-box/hooks/use-infinite-scroll-message-history';

const cx = cnBind.bind(styles);

export const ChatBox: FC = () => {
  const dispatch = useAppDispatch();
  const messageListRef = useRef<HTMLDivElement>(null);
  const { id: chatId } = useAppSelector(state => state.dialogSlice.currentDialog);
  const { account_id: accountId } = useAppSelector(state => state.userSlice.user);
  const messagesMap = useAppSelector(state => state.messageSlice.messages);
  const {currentPage, limit, hasMore} = useAppSelector(state => state.messageSlice);

  const messages = messagesMap[String(chatId)];

  const {scrollToTopThird, scrollToBottom } = useScroll(messageListRef);
  const messageIntersectionHandler: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry?.isIntersecting) {
        const messageId = entry?.target.getAttribute('data-message-sender-id');
        if (!messageId?.startsWith(accountId)) {
          const modifiedMsgId = Number(messageId?.split(' ').at(1));

          messages.forEach(msg => {
            if (msg.id === modifiedMsgId && !msg.is_read) {
              dispatch(setMessageIsReadAsync({ chatId, messageId: modifiedMsgId }));
            }
          });
        }

        observer.unobserve(entry.target);
      }
    });
  };

  useSetMessageIsRead(messageIntersectionHandler, {
      root: messageListRef?.current,
      threshold: 1.0,
    }, messages);

  const loadHistoryHandler = useInfiniteScrollMessageHistory<HTMLDivElement>(() => {
    if (hasMore) {
        let page = currentPage;
        page += 1;
        dispatch(getLatestMessagesAsync({ chatId, page, limit }));
      }
    }, [])


  useEffect(() => {
    scrollToTopThird();
  }, [loadHistoryHandler]);

  // useEffect(() => {
  //   scrollToBottom()
  // }, []);


  return chatId ? (
    <div className={cx('chat-box', { 'chat-box--nomessages': messages.length <= 0 })} ref={messageListRef}>
      {messages && messages.length > 0 ? (
        messages.map((message, index) => <Message key={message.id} {...message} ref={index === 0 ? loadHistoryHandler : null}/> )
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
