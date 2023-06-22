import React, { useEffect } from 'react';
import cnBind from 'classnames/bind';
import styles from './im.module.scss';
import { Chat } from 'components/chat';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { LeftSidebar } from 'components/left-sidebar';
import { RightSidebar } from 'components/right-sidebar';
import { getCurrentUserAsync, updateUserOnlineStatusAsync } from 'entities/user';
import { getAccessToken } from 'entities/user/api/user.actions';
import { getDialogs } from "entities/dialog/model/dialog.actions";

const cx = cnBind.bind(styles);

export const Im = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(state => state.dialogSlice);
  const { rightIsOpen } = useAppSelector(state => state.rightSidebarSlice);
  const { isOnline, user } = useAppSelector(state => state.userSlice);
  const { accessToken } = useAppSelector(state => state.authSlice);

  useEffect(() => {
    dispatch(getCurrentUserAsync());
    // dispatch(getDialogs());
  }, []);

  useEffect(() => {
    dispatch(getAccessToken({ accessToken }));
  }, [accessToken]);

  useEffect(() => {
    if (isOnline) {
      dispatch(
        updateUserOnlineStatusAsync({
          accountId: user.accountId,
          username: user.username,
          status: 'online',
        })
      );
    }
  }, [isOnline]);

  const handleBeforeUnload = () => {

    console.log(user.username, user.accountId);
    dispatch(
      updateUserOnlineStatusAsync({
        accountId: user.accountId,
        username: user.username,
        status: 'offline',
      })
    );
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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
