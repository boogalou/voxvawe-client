import React, {FC} from 'react';
import styles from './dialog.module.scss';
import cnBind from 'classnames/bind';
import {Avatar, UnreadMsgBadge} from 'shared/ui';


export interface IMessage {
  id: number;
  userId: number;
  text: string;
  timestamp: string;
  isRead: boolean;
  isGroup: boolean;
  attachments: [];
}

export interface IDialog {
  id: number;
  userId: number;
  userPic: string;
  fullName: string;
  lastMsgDate: string;
  unreadCount: number;
  isOnline: boolean;
  messages: IMessage[];
}

const cx = cnBind.bind(styles);

export interface IDialogProps extends IDialog {
  selectedId: number | null;
  onClick: (id: number) => void;
}

export const Dialog: FC<IDialogProps> = (
    {
      userId,
      userPic,
      fullName,
      unreadCount,
      isOnline,
      lastMsgDate,
      messages,
      selectedId,
      onClick
    }
) => {

  const onClickHandler = () => {
    onClick(userId)
  }
  return (
      <li
          className={cx('dialog', {"dialog--selected": userId === selectedId})}
          onClick={onClickHandler}
      >
        <a href="#" className={cx("dialog__link")}>
          <div className={cx("dialog__container")}>
            <div className={cx("dialog__avatar")}>
              <Avatar avatarImg={userPic}/>
            </div>
            <div className={cx("dialog__name")}>{fullName}</div>
            <div className={cx("dialog__time-date")}>
              {messages.filter(msg => msg.userId === userId).at(-1)?.timestamp}
            </div>
            <div className={cx("dialog__last-message")}>
              {messages.filter(msg => msg.userId === userId).at(-1)?.text}
            </div>
            <div className={cx("dialog__unread-message")}>
              <UnreadMsgBadge count={unreadCount}/>
            </div>
          </div>
        </a>
      </li>
  );
};
