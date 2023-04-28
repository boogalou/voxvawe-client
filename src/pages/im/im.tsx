import React, { useEffect } from 'react';
import cnBind from 'classnames/bind';
import styles from './im.module.scss';
import { Sidebar } from 'shared/ui';
import { socket } from 'app/socket.io';
import { dialogsFetchThunk } from 'entities/dialog';
import { checkAuthRequest } from 'entities/auth';
import { Chat } from 'components/chat';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { LeftSidebar } from 'components/left-sidebar';

const cx = cnBind.bind(styles);

export const Im = () => {
  const { isOpen } = useAppSelector(state => state.dialogSlice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('перезагрузка приложения');
    if (localStorage.getItem('token')) {
      dispatch(checkAuthRequest());
      console.log('отработал диспатч checkAuthRequest');
    }
    dispatch(dialogsFetchThunk());
    console.log('отработал диспатч dialogsFetchThunk');

    console.log('начало соединения с с websocket...');
    socket.on('connected', data => {
      console.log(data.message);
    });
    socket.connect();
  }, []);

  return (
    <div className={cx('im')}>
      <aside className={cx('left-sidebar', { 'left-sidebar--active': isOpen })}>
        <LeftSidebar />
      </aside>

      <main className={cx('main', { 'main--active': isOpen, 'main--close': !isOpen })}>
        <Chat />
      </main>

      <Sidebar className={cx('right-sidebar', { 'right-sidebar--active': false })}></Sidebar>
    </div>
  );
};


