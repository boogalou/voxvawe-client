import React, { FC } from 'react';
import cnBind from 'classnames/bind';
import styles from './avatar.module.scss';
import { generateColor, getInitials } from 'shared/lib';
import { useAppDispatch } from 'shared/hooks';

const cx = cnBind.bind(styles);

export interface AvatarProps {
  className?: string;
  avatarImg?: string;
  accountId?: string;
  username?: string;
}

export const Avatar: FC<AvatarProps> = ({ avatarImg, accountId = '', username = '' }) => {
  const dispatch = useAppDispatch();

  const avatarPlaceholder = generateColor(accountId);
  const initials = getInitials(username);

  const handleOnClick = () => {};

  return (
    <div
      className={cx('avatar')}
      onClick={handleOnClick}
    >
      {avatarImg ? (
        <img className={cx('avatar__img')} src={avatarImg} alt="user picture" />
      ) : (
        <div className={cx('avatar__color')} style={{ backgroundColor: avatarPlaceholder }}>
          {...initials}
        </div>
      )}
    </div>
  );
};
