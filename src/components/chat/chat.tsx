import React, { useEffect } from 'react';
import styles from './chat.module.scss';
import cnBind from 'classnames/bind';
import { Content, Footer, Header, Preloader } from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { MessageBox } from './message-box';
import { ChatInfo } from './chat-info';
import { ChatBox } from './chat-box';
import { useLocation } from 'react-router-dom';
import { closeChat, leaveRoomAsync } from 'entities/dialog';

const cx = cnBind.bind(styles);

export const Chat = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { selectedDialog, isClose } = useAppSelector(state => state.dialogSlice);
  const { id: chatId } = useAppSelector(state => state.dialogSlice.currentDialog);
  const { account_id: accountId } = useAppSelector(state => state.userSlice.user);
  const { status } = useAppSelector(state => state.messageSlice);

  useEffect(() => {
    if (!isClose && location.pathname === '/') {
      dispatch(leaveRoomAsync({ chatId, accountId }));
      dispatch(closeChat(false));
    }
  }, [isClose, location]);

  useEffect(() => {
    window.history.replaceState({}, document.title, '/');
  }, []);

  return !!selectedDialog ? (
    <div className={cx('chat')}>
      <Header className={cx('chat__header')}>
        <ChatInfo />
      </Header>
      <Content className={cx('chat__content')}>
        {status === 'loading' ? <Preloader className={cx('chat__preloader')} /> : <ChatBox />}
      </Content>
      <Footer className={cx('chat__footer')}>
        <MessageBox />
      </Footer>
    </div>
  ) : null;
};
