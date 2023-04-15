import React, {FC, ForwardedRef, forwardRef, RefAttributes} from 'react';
import cnBind from "classnames/bind";
import styles from './dropdown.module.scss';
import {List} from "shared/ui";

const cx = cnBind.bind(styles);

export interface IDropdownProps extends RefAttributes<HTMLDivElement> {
  className?: string;
  classNameItem?: string;
  items: Array<{ id: number, title: string }>;
  onClickMenuItem: (id: number) => void;
}

export const Dropdown = React.forwardRef((
    {
      className,
      classNameItem,
      items,
      onClickMenuItem,
    }: IDropdownProps, ref: ForwardedRef<HTMLUListElement>) => {



  return (
      <ul
          className={cx(className)}
          ref={ref}
      >
        <List items={items} renderItem={(item) => (
            <li
                key={item.id}
                onClick={() => onClickMenuItem(item.id)}
                className={cx(classNameItem)}>
              {item.title}
            </li>
        )}/>
      </ul>
  );
});