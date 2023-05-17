import React, { FC } from 'react';
import styles from './contact.module.scss';
import cnBind from 'classnames/bind';
import { Avatar } from 'shared/ui';
import { formatTimePassed } from 'shared/lib';
import { IContact } from 'shared/types';
import { Link } from 'react-router-dom';

const cx = cnBind.bind(styles);

export interface IContactProps extends IContact {
  className?: string;
  children?: React.ReactNode;
}

export const Contact: FC<IContactProps> = ({ avatar, username, lastSeen, accountId }) => {
  const lastSeenTime = formatTimePassed(lastSeen);

  return (
    <li className={cx('contact')}>
      <Link to={`/im/@${accountId}`} className={cx('contact__link')}>
        <div className={cx('contact__container')}>
          <div className={cx('contact__avatar')}>
            <Avatar avatarImg={avatar} />
          </div>
          <div className={cx('contact__name')}>{username}</div>
          <div className={cx('contact__last-visit')}>{lastSeenTime}</div>
        </div>
      </Link>
    </li>
  );
};
