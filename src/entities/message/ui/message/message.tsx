import React, { FC } from 'react';
import styles from "./message.module.scss";
import cnBind from "classnames/bind";
import {Avatar, Icon} from "shared/ui";
import {useAppSelector} from "shared/hooks";


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

export const Message: FC<MessageProps> = ({ text, userId, isRead }) => {

  const hostId: number = 666333999;
  const { interlocutor_avatar } = useAppSelector(state => state.dialogSlice.currentDialog!);
  return (
      <div className={cx("message", { "message--you": userId === hostId })}>
        <div className={cx("message__inner")}>
          <div className={cx("message__avatar")}>
            <Avatar
                className={cx("message__avatar-img")}
                avatarImg={interlocutor_avatar}
            />
          </div>
          <div className={cx("message__body")}>
            <p className={cx("message__text")}>{text}</p>
            <div className={cx("message__info")}>
              <div className={cx("message__time")}>12:15</div>
              <div className={cx("message__status", { "message__status--read": isRead })}>
                <Icon className={cx("message__status-icon")} typeIcon={"msg-status"} />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
