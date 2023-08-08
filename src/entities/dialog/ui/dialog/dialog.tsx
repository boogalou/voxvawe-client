import React, { FC, useState } from 'react';
import styles from './dialog.module.scss';
import cnBind from 'classnames/bind';
import { Avatar, UnreadMsgBadge } from 'shared/ui';
import { Link } from 'react-router-dom';
import { IDialog } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { formatTimePassed, generateColor, getInitials } from 'shared/lib';
import { moveFrontMiddleColumn, setSelectedDialogAction } from 'entities/dialog';
import { connectToRoomAsync } from 'entities/dialog/api';
import { getLatestMessagesAsync } from 'entities/message';

const cx = cnBind.bind(styles);

export const Dialog: FC<IDialog> = ({
  id,
  username,
  avatar,
  is_group,
  lastMessage,
  unreadMessages,
  lastMessageTime,
  is_online,
}) => {
  const dispatch = useAppDispatch();
  const { account_id: accountId } = useAppSelector(state => state.userSlice.user);
  const messages = useAppSelector(state => state.messageSlice.messages[String(id)]?.at(-1));
  const { selectedDialog } = useAppSelector(state => state.dialogSlice);
  const [touchedDialog, setTouchedDialog] = useState<number[]>([]);
  const dateLastMessageTime = formatTimePassed(lastMessageTime);
  const avatarPlaceholder = generateColor('1596987564231');
  const initials = getInitials(username);

  const clickOnDialogTab = () => {
    dispatch(setSelectedDialogAction({ chatId: id }));
    dispatch(moveFrontMiddleColumn(true));
    dispatch(connectToRoomAsync({ chatId: id, accountId }));
    if (!touchedDialog.includes(id)) {
      dispatch(getLatestMessagesAsync(id));
      setTouchedDialog(prevState => [...prevState, id]);
    }
  };

  console.log('selectedDialog: ', selectedDialog);

  return (
    <li
      className={cx('dialog', { 'dialog--selected': id === selectedDialog })}
      onClick={clickOnDialogTab}
    >
      <Link to={`/id${id}`} className={cx('dialog__link')}>
        <div className={cx('dialog__container')}>
          <div className={cx('dialog__avatar')}>
            <Avatar
              avatarImg={avatar}
              isOnline={!is_group ? is_online : false}
              avatarPlaceholder={avatarPlaceholder}
              initials={initials}
            />
          </div>
          <div className={cx('dialog__name')}>{username}</div>
          {dateLastMessageTime && (
            <div className={cx('dialog__time-date')}>
              {messages?.sent_at ? formatTimePassed(messages.sent_at) : dateLastMessageTime}
            </div>
          )}
          {lastMessage && (
            <div className={cx('dialog__last-message')}>
              {messages?.content ? messages.content : lastMessage}
            </div>
          )}
          {!unreadMessages ? null : (
            <div className={cx('dialog__unread-message')}>
              <UnreadMsgBadge count={unreadMessages} />
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};
