import React, { useRef, useState } from 'react';
import style from './main-menu.module.scss';
import cnBind from 'classnames/bind';
import { useOnClickOutside } from 'usehooks-ts';
import { Dropdown, Icon, IconButton } from 'shared/ui';
import { ThemeSwitcher } from 'components/left-sidebar/theme-switch';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { logoutRequest } from 'entities/auth';
import { setIsFocus } from 'components/left-sidebar/model/left-sidebar.slice';
import { clearSearch } from 'entities/contact/model/contacts.slice';

const cx = cnBind.bind(style);

export interface IMenuItems {
  id: number;
  title: string;
  showToggle?: boolean;
  icon?: React.ReactNode;
}

const menuItems: IMenuItems[] = [
  { id: 1, title: 'Контакты', icon: <Icon typeIcon={'profile'} /> },
  { id: 2, title: 'Темная тема', showToggle: true, icon: <Icon typeIcon={'moon'} /> },
  { id: 3, title: 'Настройки', icon: <Icon typeIcon={'settings'} /> },
  { id: 4, title: 'Выйти', icon: <Icon typeIcon={'logout'} /> },
  { id: 5, title: 'About', icon: <Icon typeIcon={'warning'} /> },
];

export const MainMenu = () => {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isFocus } = useAppSelector(state => state.leftSidebarSlice);

  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleOutsideClick = (evt: MouseEvent) => {
    if (!buttonRef.current?.contains(evt.target as Node)) {
      setIsPressed(false);
    }
  };

  const handleIsPressedButton = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsPressed(prevState => !prevState);
  };

  const handleClickBack = () => {
    dispatch(setIsFocus(false));
    dispatch(clearSearch());
  }

  const handleMenuItemClick = (id: number) => {
    setIsPressed(false);
    if (id === 4) {
      dispatch(logoutRequest());
    }
  };

  const handleToggleClick = (evt: React.MouseEvent) => {
    evt.stopPropagation();
  };

  useOnClickOutside(dropdownRef, handleOutsideClick);

  return (
    <div className={cx('main-menu')}>
      {isFocus ? (
        <IconButton
          className={cx('main-menu__button')}
          typeIcon={'arrow-left'}
          onClick={handleClickBack}
        />
      ) : (
        <IconButton
          className={cx('main-menu__button', { 'main-menu__button--pressed': isPressed })}
          typeIcon={'hamburger'}
          onClick={handleIsPressedButton}
          ref={buttonRef}
        />
      )}
      <div className={cx('main-menu__list', { 'main-menu__list--open': isPressed })}>
        <Dropdown
          ref={dropdownRef}
          items={menuItems}
          children={<ThemeSwitcher />}
          onClickMenuItem={handleMenuItemClick}
          onClickToggle={handleToggleClick}
        />
      </div>
    </div>
  );
};
