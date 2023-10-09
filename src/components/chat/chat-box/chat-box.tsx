import React, { FC, useCallback, useRef, useState } from 'react';
import cnBind from 'classnames/bind';
import styles from './chat-box.module.scss';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { useSetMessageIsRead } from './hooks/use-set-message-is-read';
import { setMessageIsReadAsync } from 'entities/dialog';
import { getLatestMessagesAsync, Message } from 'entities/message';
import { Virtuoso } from 'react-virtuoso';

const cx = cnBind.bind(styles);

export const ChatBox: FC = () => {
  const dispatch = useAppDispatch();
  const messageListRef = useRef<HTMLDivElement>(null);
  const { id: chatId } = useAppSelector(state => state.dialogSlice.currentDialog);
  const { account_id: accountId } = useAppSelector(state => state.userSlice.user);
  const messagesMap = useAppSelector(state => state.messageSlice.messages);
  const { currentPage, limit, hasMore } = useAppSelector(state => state.messageSlice);
  const [firstMessageIndex, setFirstMessageIndex] = useState(limit);

  const messages = messagesMap[String(chatId)];

  const messageIntersectionHandler: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry?.isIntersecting) {
        const messageId = entry?.target.getAttribute('data-message-sender-id');
        if (!messageId?.startsWith(accountId)) {
          const modifiedMsgId = Number(messageId?.split(' ')[1]);
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

  useSetMessageIsRead(
    messageIntersectionHandler,
    {
      root: messageListRef?.current,
      threshold: 0.5,
    },
    messages
  );

  const loadHistoryHandler = useCallback(() => {
    if (hasMore) {
      let page = currentPage;
      page += 1;
      const nextFirstMessageIndex = firstMessageIndex - limit;
      setFirstMessageIndex(() => nextFirstMessageIndex);
      dispatch(getLatestMessagesAsync({ chatId, page, limit }));
    }
  }, [firstMessageIndex, messages]);

  return chatId ? (
    <div
      className={cx('chat-box')}
      ref={messageListRef}
    >
      <Virtuoso
        className={cx('virtuoso')}
        firstItemIndex={firstMessageIndex}
        initialTopMostItemIndex={limit - 1}
        startReached={loadHistoryHandler}
        data={messages}
        itemContent={(index, messages) => {
          return <Message key={messages.id} {...messages} />;
        }}
      />
    </div>
  ) : null;
};
