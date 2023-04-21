import React, {ReactNode} from 'react';
import cnBind from "classnames/bind";
import styles from './layout.module.scss';

const cx = cnBind.bind(styles);

export interface ILayoutProps {
  className?: string;
  children?: ReactNode;
}

export function Layout({children, className}: ILayoutProps) {
  return (
      <div className={cx('container', className)}>
        {children}
      </div>
  );
};

