import React, { FC } from 'react';
import cnBind from 'classnames/bind';
import styles from './avatar.module.scss';

const cx = cnBind.bind(styles);

export interface AvatarProps {
  className?: string;
  avatarImg?: string;
  accountId?: string;
  username?: string;
  isOnline?: boolean;
  avatarPlaceholder?: string
  initials?: string[];
}

export const Avatar: FC<AvatarProps> = ({ avatarImg, accountId = '', username = '', isOnline, avatarPlaceholder, initials }) => {

  const handleOnClick = () => {};

  
  
  return (
    <div className={cx('avatar')} onClick={handleOnClick}>
      {avatarImg ? (
        <img className={cx('avatar__img')} src={avatarImg} alt="user picture" />
      ) : (
        <div className={cx('avatar__color')} style={{ backgroundColor: avatarPlaceholder }}>
          { initials }
        </div>
      )}
      <div className={cx('avatar__status', { 'avatar__status--online': isOnline })}></div>
    </div>
  );
};
