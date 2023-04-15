import React, { FC } from 'react';
import styles from "./message.module.scss";
import cnBind from "classnames/bind";
import { Avatar, Icon } from "../../../../shared";

const cx = cnBind.bind(styles);

export interface MessageProps {
  id?: number;
  userId?: number;
  text: string;
  timestamp: string;
  isRead?: boolean;
  isGroup?: boolean;
  attachments?: [];
}

export const Message: FC<MessageProps> = ({ text, userId }) => {

  const hostId: number = 100;

  return (
      <div className={cx("message", { "message--out": userId === hostId })}>
        <div className={cx("message__inner")}>
          <div className={cx("message__avatar")}>
            <Avatar avatarImg={"hello"}/>
          </div>
          <div className={cx("message__body", "body")}>
            <p className={cx("body__text")}>
              { text }
            </p>
            <div className={cx("body__info", "info")}>
              <div className={cx("info__time")}>12:15</div>
              <div className={cx("info__status")}>
                <Icon className={cx("info__status-icon")} typeIcon={"msg-status"} />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
