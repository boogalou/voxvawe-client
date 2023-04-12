import React, {FC, ReactNode} from 'react';
import cnBind from 'classnames/bind';
import styles from './header.module.scss'

const cx = cnBind.bind(styles);

export interface IHeaderProps {
  className?: string;
  children?: ReactNode;
}

export const Header: FC<IHeaderProps> = ({children, className}): JSX.Element => {
  return (
      <div className={cx(className)}>
        { children }
      </div>
  );
};
