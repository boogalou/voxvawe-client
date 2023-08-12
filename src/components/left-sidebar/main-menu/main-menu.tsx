import React, { FC, useEffect, useRef, useState } from 'react';
import style from './main-menu.module.scss';
import cnBind from 'classnames/bind';
import { useOnClickOutside } from 'usehooks-ts';
import { Dropdown, Icon, IconButton } from 'shared/ui';
import { ThemeSwitcher } from 'components/left-sidebar/theme-switch';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { logoutRequestAsync } from 'entities/auth';
import { setIsActive, setIsFocus } from 'components/left-sidebar/model/left-sidebar.slice';
import { clearCurrentContact, clearSearch, resetContactsState } from 'entities/contact';
import { resetDialogsState } from 'entities/dialog';
import { resetMessagesState } from 'entities/message';
import { closeAllSocketConnection } from 'shared/services';

const cx = cnBind.bind(style);

export interface MainMenuProps {
  handleOpenModal?: () => void
}

export interface IMenuItems {
  id: number;
  title: string;
  showToggle?: boolean;
  icon?: React.ReactNode;
  elements?: React.ReactNode[];
}

const menuItems: IMenuItems[] = [
  { id: 1, title: 'Контакты', icon: <Icon typeIcon={'profile'} /> },
  { id: 2, title: 'Темная тема', showToggle: true, icon: <Icon typeIcon={'moon'} /> },
  { id: 3, title: 'Настройки', icon: <Icon typeIcon={'settings'} /> },
  { id: 4, title: 'Создать группу', icon: <Icon typeIcon={'group'} /> },
  { id: 5, title: 'Выйти', icon: <Icon typeIcon={'logout'} /> },
  { id: 6, title: 'About', icon: <Icon typeIcon={'warning'} /> },
];

export const MainMenu: FC<MainMenuProps> = ({handleOpenModal}) => {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isFocus, isActive } = useAppSelector(state => state.leftSidebarSlice);
  const  {account_id, username}  = useAppSelector(state => state.userSlice.user);

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
    dispatch(setIsActive(false))
    dispatch(clearSearch());
    dispatch(clearCurrentContact());
  }

  const handleMenuItemClick =  (id: number) => {
    setIsPressed(false);
    if (id === 5) {
      closeAllSocketConnection();
      dispatch(resetDialogsState());
      dispatch(resetContactsState());
      dispatch(resetMessagesState());
      dispatch(logoutRequestAsync());
    }

    if (id === 4) {
      if (handleOpenModal) {
        handleOpenModal();
      }
    }

    if (id === 1) {
      dispatch(setIsActive(true));
    }
  };

  const handleToggleClick = (evt: React.MouseEvent) => {
    evt.stopPropagation();
  };

  useOnClickOutside(dropdownRef, handleOutsideClick);

  useEffect(() => {
  }, [handleMenuItemClick])

  return (
    <div className={cx('main-menu')}>
      {isFocus || isActive ? (
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
