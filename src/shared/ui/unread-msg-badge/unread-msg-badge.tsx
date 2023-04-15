import React, { FC } from 'react';
import cnBind from "classnames/bind";
import styles from './unread-msg-badge.module.scss';


const cx = cnBind.bind(styles);


export interface IUnreadBadgeProps {
  count: number;
}


export const UnreadMsgBadge: FC<IUnreadBadgeProps> = ({ count }) => {
  return (
      <div className={cx("unread-badge")}>
        <span className={cx("unread-badge__message")}>
          {count}
        </span>
      </div>
  );
};
