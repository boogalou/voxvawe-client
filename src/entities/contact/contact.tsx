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
  handleSetCurrentContact?: (arg: string) => void;
}

export const Contact: FC<IContactProps> = ({ avatar, username, lastSeen, accountId, handleSetCurrentContact }) => {
  const dispatch = useAppDispatch();

  const lastSeenTime = formatTimePassed(lastSeen);

  const handleOnclick = () => {
    if (handleSetCurrentContact) {
      handleSetCurrentContact(accountId);
    }
    dispatch(openRightSidebar(true));
  };



  return (
    <li className={cx('contact')} onClick={handleOnclick}>
      <div className={cx('contact__container')}>
        <div className={cx('contact__avatar')}>
          <Avatar avatarImg={avatar} accountId={accountId} username={username} />
        </div>
        <div className={cx('contact__name')}>{username}</div>
        <div className={cx('contact__last-visit')}>{lastSeenTime}</div>
      </div>
    </li>
  );
};
