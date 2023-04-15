import React, {ReactNode} from 'react';
import cnBind from "classnames/bind";
import styles from './layout.module.scss';

const cx = cnBind.bind(styles);

export interface ILayoutProps {
  className?: string;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
}

export function Layout({ className, header, body, footer }: ILayoutProps) {
  return (
      <div className={cx('container', className)}>
        <header className={cx('header')}>
          {header}
        </header>
        <section className={cx('body')}>
          {body}
        </section>
        <footer className={cx('footer')}>
          {footer}
        </footer>
      </div>
  );
};

