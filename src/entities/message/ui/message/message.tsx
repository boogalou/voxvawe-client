import React, { FC } from 'react';
import styles from './message.module.scss';
import cnBind from 'classnames/bind';
import { Avatar, Icon } from 'shared/ui';
import { useAppSelector } from 'shared/hooks';
import { format } from 'date-fns';

const cx = cnBind.bind(styles);

export interface MessageProps {
  id: number;
  chat_id: number;
  sender_id: string;
  recipient_id: string;
  content: string;
  sent_at: Date;
  edit_at: Date | null;
  is_read: boolean;
  is_delivered: boolean;
  is_deleted: boolean;
  attachments: [];
}

export const Message: FC<MessageProps> = ({ content, sender_id, is_read, sent_at }) => {

  const sentAt = format(new Date(sent_at!), 'HH:mm');
  const accountId = useAppSelector(state => state.userSlice.user.account_id);
  const { avatar } = useAppSelector(state => state.dialogSlice.currentDialog!);

  return (
    <div className={cx('message', { 'message--you': sender_id === accountId })}>
      <div className={cx('message__inner')}>
        <div className={cx('message__avatar')}>
          <Avatar className={cx('message__avatar-img')} avatarImg={avatar} />
        </div>
        <div className={cx('message__body')}>
          <p className={cx('message__text')}>{content}</p>
          <div className={cx('message__info')}>
            <div className={cx('message__time')}>{sentAt}</div>
            <div className={cx('message__status', { 'message__status--read': is_read })}>
              <Icon className={cx('message__status-icon')} typeIcon={'msg-status'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
