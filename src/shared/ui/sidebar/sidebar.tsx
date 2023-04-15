import React, {FC, ReactNode} from 'react';
import cnBind from 'classnames/bind';
import styles from './sidebar.module.scss'

const cx = cnBind.bind(styles);

export interface ISidebarProps {
  className?: string;
  children?: ReactNode;
}

export const Sidebar: FC<ISidebarProps> = ({children, className}) => {
  return (
      <div className={cx(className)}>
        {children}
      </div>
  );
};
