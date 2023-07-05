import React, { useEffect, useRef } from "react";
import cnBind from 'classnames/bind';
import styles from './im.module.scss';
import { Chat } from 'components/chat';
import { useAppDispatch, useAppSelector, useSocketConnectionMonitor } from 'shared/hooks';
import { LeftSidebar } from 'components/left-sidebar';
import { RightSidebar } from 'components/right-sidebar';
import { getCurrentUserAsync } from 'entities/user';
import { getAccessToken } from 'entities/user/api/user.actions';
import { getDialogsAsync } from 'entities/dialog/api/dialog.actions';

const cx = cnBind.bind(styles);

export const Im = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(state => state.dialogSlice);
  const { rightIsOpen } = useAppSelector(state => state.rightSidebarSlice);
  const { isOnline, user } = useAppSelector(state => state.userSlice);
  const { accessToken } = useAppSelector(state => state.authSlice);
  // const prevAccessToken = useRef(accessToken);


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
