import React, {FC, ReactNode} from 'react';
import cnBind from 'classnames/bind';
import styles from './footer.module.scss'

const cx = cnBind.bind(styles);

export interface IFooterProps{
  className?: string;
  children?: ReactNode;
}

export const Footer: FC<IFooterProps> = ({children, className}) => {
  return (
      <div className={cx(className)}>
        { children }
      </div>
  );
};
