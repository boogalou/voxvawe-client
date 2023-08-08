import React, { FC, useEffect } from 'react';
import styles from './chat.module.scss';
import cnBind from 'classnames/bind';
import { Content, Footer, Preloader } from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { MessageBox } from './message-box';
import { ChatInfo } from './chat-info';
import { ChatBox } from './chat-box';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Header } from 'shared/ui';
import { closeChat } from 'entities/dialog';


const cx = cnBind.bind(styles);

export const Chat= () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedDialog, isOpen } = useAppSelector(state => state.dialogSlice);
  const { status } = useAppSelector(state => state.messageSlice);

  const handlePopstate = () => {
    if (isOpen) {
      dispatch(closeChat(false));
      navigate('/');
    }
  };

  useEffect(() => {
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.addEventListener('popstate', handlePopstate);
    };
  }, [navigate]);

  useEffect(() => {
    window.history.replaceState({}, document.title, '/');
  }, []);


  return selectedDialog === -1 ? null : (

     <div className={cx('chat')}>
      <Header className={cx('chat__header')}>
        {selectedDialog && <ChatInfo/>}
      </Header>
      <Content className={cx('chat__content')}>
        {status === 'loading' ? <Preloader className={cx('chat__preloader')} /> : <ChatBox />}
      </Content>
      <Footer className={cx('chat__footer')}>
        { selectedDialog && <MessageBox /> }
      </Footer>
    </div>
  )
};
