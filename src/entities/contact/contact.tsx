import React, { FC, useState } from 'react';
import styles from './contact.module.scss';
import cnBind from 'classnames/bind';
import { Avatar } from 'shared/ui';
import { formatTimePassed } from 'shared/lib';
import { IContact } from 'shared/types';
import { useAppDispatch } from 'shared/hooks';
import { openRightSidebar } from 'components/right-sidebar/model';

const cx = cnBind.bind(styles);

export interface IContactProps extends IContact {
  className?: string;
  children?: React.ReactNode;
  handleSetCurrentContact: (arg: string) => void;
  ignoreClick?: boolean;
}

export const Contact: FC<IContactProps> = ({
  avatar,
  username,
  last_seen,
  account_id,
  handleSetCurrentContact,
  is_online,
  ignoreClick,
}) => {
  const dispatch = useAppDispatch();

  const lastSeenDate = formatTimePassed(last_seen);

  const handleOnclick = () => {
    if (handleSetCurrentContact) {
      handleSetCurrentContact(account_id);
    }
  if (!ignoreClick) {
    dispatch(openRightSidebar(true));
  }
  };

  return (
    <li className={cx('contact')} onClick={handleOnclick}>
      <div className={cx('contact__container')}>
        <div className={cx('contact__avatar')}>
          <Avatar
            avatarImg={avatar}
            accountId={account_id}
            username={username}
            isOnline={is_online}
          />
        </div>
        <div className={cx('contact__name')}>{username}</div>
        <div className={cx('contact__last-visit')}>{lastSeenDate}</div>

      </div>
    </li>
  );
};
