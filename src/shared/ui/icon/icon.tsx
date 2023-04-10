import React, { FC } from 'react';
import cnBind from 'classnames/bind';
import styles from './icon.module.scss';
import { IconType, iconTypes } from './icon-type';

const cx = cnBind.bind(styles);


interface IconProps {
  className?: string;
  typeIcon: IconType
  onClick?: () => void
}

const getIcon = (type: IconType): JSX.Element => iconTypes.get(type) as JSX.Element;

export const Icon: FC<IconProps> = (
    {
      className,
      typeIcon,
      onClick, ...rest
    }
) => {
  return (
      <div
          className={cx('icon', className)}
          onClick={onClick}
          {...rest}
      >
        {getIcon(typeIcon)}
      </div>
  );
};
