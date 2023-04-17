import React, {ForwardedRef, ReactNode, RefAttributes} from 'react';
import cnBind from "classnames/bind";
import styles from './dropdown.module.scss';
import {List, Toggle} from "shared/ui";

const cx = cnBind.bind(styles);

export interface IDropdownProps extends RefAttributes<HTMLDivElement> {
  className?: string;
  classNameItem?: string;
  children: ReactNode;
  items: Array<{ id: number, title: string, showToggle?: boolean }>;
  onClickMenuItem: (id: number) => void;
  onClickToggle: (evt: React.MouseEvent) => void;
}

export const Dropdown = React.forwardRef((
    {
      className,
      classNameItem,
      items,
      children,
      onClickMenuItem,
      onClickToggle,
    }: IDropdownProps, ref: ForwardedRef<HTMLUListElement>) => {


  return (
      <ul
          className={cx('dropdown')}
          ref={ref}
      >
        <List items={items} renderItem={(item) => (
            <li
                key={item.id}
                onClick={() => onClickMenuItem(item.id)}
                className={cx('dropdown__item')}
            >
              <div className={cx("dropdown__icon")}></div>
              <span className={cx("dropdown__title")}>{item.title}</span>
              <div
                  className={cx("dropdown__control")}
                  onClick={onClickToggle}
              >
                {item.showToggle && children}
              </div>
            </li>
        )}/>
      </ul>
  );
});