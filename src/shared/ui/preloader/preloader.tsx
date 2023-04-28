import React, { FC } from 'react';
import './preloader.scss'
import cn from 'classnames'
import { Icon } from 'shared/ui';

export interface IPreloaderBox {
  className?: string;
}

export const Preloader: FC<IPreloaderBox> = ({ className }) => {
  return (
    <>
      <Icon
        className={cn('preloader__icon', className)}
        typeIcon={'preloader'}/>
    </>
  );
};
