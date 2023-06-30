import React, { FC } from 'react';
import styles from "./message.module.scss";
import cnBind from "classnames/bind";
import {Avatar, Icon} from "shared/ui";
import {useAppSelector} from "shared/hooks";
import {format} from 'date-fns'


const cx = cnBind.bind(styles);

export interface MessageProps {
  id?: number;
  senderId?: string;
  content?: string;
  sentAt?: string;
  isRead?: boolean;
  attachments?: [];
}

export const Message: FC<MessageProps> = ({ content, senderId, isRead, sentAt }) => {
const sent_at = format(new Date(sentAt!), 'HH:mm')
  const accountId = useAppSelector(state => state.userSlice.user.accountId)
  const { avatar } = useAppSelector(state => state.dialogSlice.currentDialog!);


  return (
      <div className={cx("message", { "message--you": senderId === accountId })}>
        <div className={cx("message__inner")}>
          <div className={cx("message__avatar")}>
            <Avatar
                className={cx("message__avatar-img")}
                avatarImg={avatar}
            />
          </div>
          <div className={cx("message__body")}>
            <p className={cx("message__text")}>{content}</p>
            <div className={cx("message__info")}>
              <div className={cx("message__time")}>{sent_at}</div>
              <div className={cx("message__status", { "message__status--read": isRead })}>
                <Icon className={cx("message__status-icon")} typeIcon={"msg-status"} />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
