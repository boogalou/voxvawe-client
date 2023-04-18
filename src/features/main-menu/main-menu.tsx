import React, {useRef, useState} from 'react';
import style from './main-menu.module.scss';
import cnBind from "classnames/bind";
import {useOnClickOutside} from "usehooks-ts";
import {Dropdown, Icon, IconButton, Toggle} from "shared/ui";
import {useToggleTheme} from "@/shared/hooks/use-toggle-theme";


const cx = cnBind.bind(style);

export interface IMenuItems {
  id: number,
  title: string,
  showToggle?: boolean,
  icon?: React.ReactNode,
}

const menuItems: IMenuItems[] = [
  {id: 1, title: 'Контакты', icon: <Icon typeIcon={"profile"}/>},
  {id: 2, title: 'Темная тема', showToggle: true, icon: <Icon typeIcon={"moon"}/>},
  {id: 3, title: 'Настройки', icon: <Icon typeIcon={"settings"}/>},
  {id: 4, title: 'Выйти', icon: <Icon typeIcon={"logout"}/>},
  {id: 5, title: 'About', icon: <Icon typeIcon={"warning"}/>},
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

  const handleToggleSwitch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if(evt.target.checked) {
      handleToggleTheme()
    }
    handleToggleTheme()
  }

  const [handleToggleTheme] = useToggleTheme('light-theme');

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
              children={
            <Toggle
                name={'theme'}
                onChange={handleToggleSwitch}
            />
          }
              onClickMenuItem={handleMenuItemClick}
              onClickToggle={handleToggleClick}
          />
        </div>
      </div>
  );
};
