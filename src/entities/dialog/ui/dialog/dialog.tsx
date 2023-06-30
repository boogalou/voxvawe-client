import React, { FC } from 'react';
import styles from './dialog.module.scss';
import cnBind from 'classnames/bind';
import { Avatar, UnreadMsgBadge } from 'shared/ui';
import { Link } from 'react-router-dom';
import { IDialog } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { formatTimePassed } from 'shared/lib';
import { setSelectedDialogAction, moveFrontMiddleColumn } from 'entities/dialog';
import { connectToRoomAsync } from 'entities/dialog/api';

const cx = cnBind.bind(styles);

export interface IDialogProps extends IDialog {}

export const Dialog: FC<IDialogProps> = ({
  id,
  name,
  avatar,
  accountId,
  lastMessageText,
  unreadMessages,
  lastMessageTime,
  isOnline,
}) => {
  const dispatch = useAppDispatch();
  const userJoinedId = useAppSelector(state => state.userSlice.user.accountId);
  console.log('userJoinedId: ', userJoinedId);
  const onClickHandler = () => {

    dispatch(setSelectedDialogAction(accountId));
    dispatch(moveFrontMiddleColumn(true));
    dispatch(connectToRoomAsync({ chatId: id, userJoinedId }));
  };

  const { selectedDialog } = useAppSelector(state => state.dialogSlice);
  const dateLastMessageTime = formatTimePassed(lastMessageTime);

  return (
    <li
      className={cx('dialog', { 'dialog--selected': accountId === selectedDialog })}
      onClick={onClickHandler}
    >
      <Link to={`/im/@${accountId}`} className={cx('dialog__link')}>
        <div className={cx('dialog__container')}>
          <div className={cx('dialog__avatar')}>
            <Avatar avatarImg={avatar} isOnline={isOnline} />
          </div>
          <div className={cx('dialog__name')}>{name}</div>
          <div className={cx('dialog__time-date')}>{dateLastMessageTime}</div>
          <div className={cx('dialog__last-message')}>{lastMessageText}</div>
          <div className={cx('dialog__unread-message')}>
            {unreadMessages <= 0 ? '' : <UnreadMsgBadge count={unreadMessages} />}
          </div>
        </div>
      </Link>
    </li>
  );
};
