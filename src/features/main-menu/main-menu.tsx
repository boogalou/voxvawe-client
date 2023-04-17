import React, {useRef, useState} from 'react';
import style from './main-menu.module.scss';
import cnBind from "classnames/bind";
import {useOnClickOutside} from "usehooks-ts";
import {Dropdown, IconButton, Toggle} from "shared/ui";


const cx = cnBind.bind(style);

const menuItems: Array<{ id: number, title: string, showToggle?: boolean }> = [
  {id: 1, title: 'Контакты'},
  {id: 2, title: 'Темная тема', showToggle: true},
  {id: 3, title: 'Настройки'},
  {id: 4, title: 'Выйти'},
  {id: 5, title: 'About'},
];

export const MainMenu = () => {

  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleOutsideClick = (evt: MouseEvent) => {
    if (!buttonRef.current?.contains(evt.target as Node)) {
      setIsPressed(false);
    }
  };

  const handleIsPressedButton = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsPressed(prevState => !prevState);
  }

  const handleMenuItemClick = (id: number) => {
    setIsPressed(false);
    console.log(`Clicked item ${id}`);
  };

  const handleToggleClick = (evt: React.MouseEvent) => {
    evt.stopPropagation()
  }

  useOnClickOutside(dropdownRef, handleOutsideClick);

  return (
      <div className={cx('main-menu')}>
        <IconButton
            className={cx('main-menu__button', {'main-menu__button--pressed': isPressed})}
            typeIcon={'hamburger'}
            onClick={handleIsPressedButton}
            ref={buttonRef}
        />
        <div className={cx("main-menu__list", {"main-menu__list--open": isPressed})}>
          <Dropdown
              ref={dropdownRef}
              items={menuItems}
              children={<Toggle name={'theme'} />}
              onClickMenuItem={handleMenuItemClick}
              onClickToggle={handleToggleClick}
          />
        </div>
      </div>
  );
};
