import React, {MouseEventHandler, useRef, useState} from 'react';
import style from './main-menu.module.scss';
import cnBind from "classnames/bind";
import {useOnClickOutside} from "usehooks-ts";
import {IconButton, Dropdown} from "shared/ui";


const cx = cnBind.bind(style);

export const MainMenu = () => {

  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isPressed, setIsPressed] = useState<boolean>(false);

  const menuItems: Array<{ id: number, title: string }> = [
    {id: 1, title: 'Контакты'},
    {id: 2, title: 'Темная тема'},
    {id: 3, title: 'Настройки'},
    {id: 4, title: 'Выйти'},
    {id: 5, title: 'About'},
  ];

  const handleIsPressedButton = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsPressed(prevState => !prevState);
  }

  const handleMenuItemClick = (id: number) => {
    setIsPressed(false);
    console.log(`Clicked item ${id}`);
  };



  const handleOutsideClick = (evt: MouseEvent) => {
    if (!buttonRef.current?.contains(evt.target as Node)) {
      setIsPressed(false);
    }
  };

  useOnClickOutside(dropdownRef, handleOutsideClick);

  return (
      <div className={cx('main-menu')}>
        <IconButton
            className={cx('main-menu__button', {'main-menu__button--pressed': isPressed})}
            typeIcon={'hamburger'}
            onClick={handleIsPressedButton}
            ref={buttonRef}
        />
        <Dropdown
            className={cx('main-menu__list', {'main-menu__list--open': isPressed})}
            classNameItem={cx('main-menu__item')}
            ref={dropdownRef}
            items={menuItems}
            onClickMenuItem={handleMenuItemClick}
        />
      </div>
  );
};
