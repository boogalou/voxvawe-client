import React, { FC } from 'react';
import cnBind from "classnames/bind";
import styles from './avatar.module.scss'

const cx = cnBind.bind(styles);
export interface AvatarProps {
  className?: string;
  avatarImg: string;
}

export const Avatar: FC<AvatarProps> = ({ avatarImg }) => {
  return (
      <div className={cx('avatar')}>
        <img
            className={cx('avatar__img')}
            src={ avatarImg }
            alt="user picture"
        />
      </div>
  );
};






