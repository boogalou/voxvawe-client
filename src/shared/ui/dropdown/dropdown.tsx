import React, {ForwardedRef, ReactNode, RefAttributes} from 'react';
import cnBind from "classnames/bind";
import styles from './dropdown.module.scss';
import {List} from "shared/ui";
import {IMenuItems} from "components/left-sidebar/main-menu/main-menu";

const cx = cnBind.bind(styles);

export interface IDropdownProps extends RefAttributes<HTMLDivElement> {
  className?: string;
  classNameItem?: string;
  children?: ReactNode;
  items: IMenuItems[];
  onClickMenuItem: (id: number) => void;
  onClickToggle?: (evt: React.MouseEvent) => void;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Dropdown = React.forwardRef((
    {
      className,
      classNameItem,
      items,
      children,
      onClickMenuItem,
      onClickToggle,
      onChange,
    }: IDropdownProps, ref: ForwardedRef<HTMLUListElement>) => {


  return (
      <ul
          className={cx('dropdown', className)}
          ref={ref}
      >
        <List items={items} renderItem={(item) => (
            <li
                key={item.id}
                onClick={() => onClickMenuItem(item.id)}
                className={cx('dropdown__item')}
            >
              <div className={cx("dropdown__icon")}>{ item.icon }</div>
              <span className={cx("dropdown__title")}>{ item.title }</span>
              {
                item.elements && (
                  <div className={cx('dropdown__menu-elements')}>
                    {item.elements.map((element, index) => (
                      <div
                        key={index}
                        className={cx('dropdown__menu-element', classNameItem)}
                        onChange={onChange}
                      >
                        {element}
                      </div>
                    ))}
                  </div>
                )
              }
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