import React, {FC} from 'react';
import styles from './dialog.module.scss';
import cnBind from 'classnames/bind';
import {Avatar, UnreadMsgBadge} from 'shared/ui';
import { Link } from 'react-router-dom';
import { IDialog } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { formatTimePassed, } from 'shared/lib';
import { moveFrontMiddleColumn, setSelectedDialogAction } from 'entities/dialog';



const cx = cnBind.bind(styles);

export interface IDialogProps extends IDialog {
}

export const Dialog: FC<IDialogProps> = (
    {
      id,
      name,
      last_message_status,
      last_message_text,
      last_message_time,
      interlocutor_id,
      interlocutor_avatar,
      interlocutor_name,
      unread_messages,
      created_at,
      updated_at,
      isActive,
    }
) => {
  const dispatch = useAppDispatch();
  const onClickHandler = () => {
    dispatch(setSelectedDialogAction(interlocutor_id));
    dispatch(moveFrontMiddleColumn(true));
  }

  const { selectedDialog } = useAppSelector(state => state.dialogSlice)

  const dateLastMessageTime = formatTimePassed(last_message_time);
  const now = new Date();
  const isoString = now.toISOString();
  console.log(isoString);
  return (
      <li
          className={cx('dialog', {"dialog--selected": interlocutor_id === selectedDialog})}
          onClick={onClickHandler}
      >
        <Link to={`/im/@${interlocutor_id}`} className={cx("dialog__link")}>
          <div className={cx("dialog__container")}>
            <div className={cx("dialog__avatar")}>
              <Avatar avatarImg={interlocutor_avatar}/>
            </div>
            <div className={cx("dialog__name")}>
              {interlocutor_name}
            </div>
            <div className={cx("dialog__time-date")}>
              { dateLastMessageTime }
            </div>
            <div className={cx("dialog__last-message")}>
              {last_message_text}
            </div>
            <div className={cx("dialog__unread-message")}>
              <UnreadMsgBadge count={unread_messages}/>
            </div>
          </div>
        </Link>
      </li>
  );
};
