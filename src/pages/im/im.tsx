import React, { useEffect } from 'react';
import cnBind from 'classnames/bind';
import styles from './im.module.scss';
import { Chat } from 'components/chat';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { LeftSidebar } from 'components/left-sidebar';
import { RightSidebar } from 'components/right-sidebar';
import { getAccessToken, getCurrentUserAsync } from 'entities/user';
import { getDialogsAsync } from 'entities/dialog';

const cx = cnBind.bind(styles);



export const Im = () => {

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(state => state.dialogSlice);
  const { rightIsOpen } = useAppSelector(state => state.rightSidebarSlice);
  const { accessToken } = useAppSelector(state => state.authSlice);

  useEffect(() => {
    dispatch(getCurrentUserAsync());
    dispatch(getDialogsAsync());
  }, []);

  useEffect(() => {
      dispatch(getAccessToken({ access_token: accessToken }));
  }, [accessToken]);


  return (
    <div className={cx('im')}>
      <aside className={cx('left-sidebar', { 'left-sidebar--active': isOpen })}>
        <LeftSidebar />
      </aside>

      <main
        className={cx('main', {
          'main--active': isOpen,
          'main--close': !isOpen,
          'main--ractive': rightIsOpen,
          'main--rclose': !rightIsOpen,
        })}
      >
        <Chat />
      </main>

      <aside className={cx('right-sidebar', { 'right-sidebar--active': rightIsOpen })}>
        <RightSidebar />
      </aside>
    </div>
  );
};
