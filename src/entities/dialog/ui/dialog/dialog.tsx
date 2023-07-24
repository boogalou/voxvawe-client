import React, { FC, useState } from "react";
import styles from './dialog.module.scss';
import cnBind from 'classnames/bind';
import { Avatar, UnreadMsgBadge } from 'shared/ui';
import { Link } from 'react-router-dom';
import { IDialog } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { formatTimePassed } from 'shared/lib';
import { setSelectedDialogAction, moveFrontMiddleColumn } from 'entities/dialog';
import { connectToRoomAsync } from 'entities/dialog/api';
import { getLatestMessagesAsync } from 'entities/message';

const cx = cnBind.bind(styles);

export interface IDialogProps extends IDialog {}

export const Dialog: FC<IDialogProps> = ({
  id,
  username,
  avatar,
  account_id,
  lastMessageText,
  unreadMessages = 10,
  lastMessageTime,
  is_online,
}) => {
  const dispatch = useAppDispatch();
  const userJoinedId = useAppSelector(state => state.userSlice.user.account_id);
  console.log('userJoinedId: ', userJoinedId);

  const [checkedId, setChaeckedIs] = useState<number[]>([])

  const clickOnDialogTab = () => {

    dispatch(setSelectedDialogAction(account_id));
    dispatch(moveFrontMiddleColumn(true));
    dispatch(connectToRoomAsync({ chatId: id, userJoinedId }));
    if (!checkedId.includes(id)) {
      dispatch(getLatestMessagesAsync(id));
      setChaeckedIs(prevState => [...prevState, id])
    }

  };



  const { selectedDialog } = useAppSelector(state => state.dialogSlice);
  const dateLastMessageTime = formatTimePassed(lastMessageTime);

  return (
    <li
      className={cx('dialog', { 'dialog--selected': account_id === selectedDialog })}
      onClick={clickOnDialogTab}
    >
      <Link to={`/id${account_id}`} className={cx('dialog__link')}>
        <div className={cx('dialog__container')}>
          <div className={cx('dialog__avatar')}>
            <Avatar avatarImg={avatar} isOnline={is_online} />
          </div>
          <div className={cx('dialog__name')}>{username}</div>
          <div className={cx('dialog__time-date')}>{dateLastMessageTime}</div>
          <div className={cx('dialog__last-message')}>{lastMessageText}</div>
          {unreadMessages <= 0 ? 'null' : (
            <div className={cx('dialog__unread-message')}>
              <UnreadMsgBadge count={unreadMessages} />
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};
