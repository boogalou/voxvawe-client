import React, {FC} from 'react';
import styles from './dialog.module.scss';
import cnBind from 'classnames/bind';
import {Avatar, UnreadMsgBadge} from 'shared/ui';
import { Link } from 'react-router-dom';
import { IDialog } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { formatTimePassed, } from 'shared/lib';
import { setSelectedDialogAction, moveFrontMiddleColumn } from 'entities/dialog';



const cx = cnBind.bind(styles);

export interface IDialogProps extends IDialog {
}

export const Dialog: FC<IDialogProps> = (
    {
      id,
      name,
      interlocutorId,
      interlocutorName,
      interlocutorAvatar,
      lastMessageText,
      lastMessageStatus,
      unreadMessages,
      lastMessageTime,
    }
) => {
  const dispatch = useAppDispatch();
  const onClickHandler = () => {
    dispatch(setSelectedDialogAction(interlocutorId));
    dispatch(moveFrontMiddleColumn(true));
  }

  const { selectedDialog } = useAppSelector(state => state.dialogSlice)
  const dateLastMessageTime = formatTimePassed(lastMessageTime);

  return (
    <li
      className={cx('dialog', { 'dialog--selected': interlocutorId === selectedDialog })}
      onClick={onClickHandler}
    >
      <Link to={`/im/@${interlocutorId}`} className={cx('dialog__link')}>
        <div className={cx('dialog__container')}>
          <div className={cx('dialog__avatar')}>
            <Avatar avatarImg={interlocutorAvatar} />
          </div>
          <div className={cx('dialog__name')}>{interlocutorName}</div>
          <div className={cx('dialog__time-date')}>{dateLastMessageTime}</div>
          <div className={cx('dialog__last-message')}>{lastMessageText}</div>
          <div className={cx('dialog__unread-message')}>
            { unreadMessages <= 0 ? '' : <UnreadMsgBadge count={unreadMessages} />}
          </div>
        </div>
      </Link>
    </li>
  );
};
