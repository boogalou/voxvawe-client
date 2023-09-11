import React, { FC } from 'react';
import cnBind from 'classnames/bind';
import styles from './avatar.module.scss';
import { generateColor, getInitials } from "shared/lib";

const cx = cnBind.bind(styles);

export interface AvatarProps {
  className?: string;
  avatarImg?: string;
  accountId?: string;
  username?: string;
  isOnline?: boolean;

}

export const Avatar: FC<AvatarProps> = ({ avatarImg, accountId = '', username = '', isOnline }) => {

  const handleOnClick = () => {};

  const initials = getInitials(username);
  const avatarPlaceholder = generateColor(username);
  
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
