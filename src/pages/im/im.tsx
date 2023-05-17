import React, { useEffect } from 'react';
import cnBind from 'classnames/bind';
import styles from './im.module.scss';
import io from 'socket.io-client';
import { Sidebar } from 'shared/ui';
import { dialogsFetchThunk } from 'entities/dialog';
import { Chat } from 'components/chat';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { LeftSidebar } from 'components/left-sidebar';
import { API_URL } from 'shared/constants';

import { socketConfig } from 'shared/socket';

const cx = cnBind.bind(styles);

const socket = io(API_URL, socketConfig);

export const Im = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(state => state.dialogSlice);

  useEffect(() => {
    dispatch(dialogsFetchThunk());
  }, []);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
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
