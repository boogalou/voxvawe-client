import React, { FC } from 'react';
import styles from './chat.module.scss';
import cnBind from "classnames/bind";
import {Content, Footer, Header} from "@/shared/ui";
import {ChatBox, ChatInfo} from "@/widgets";
import {MessageBox} from "@/widgets/message-box";
import {useAppSelector} from "@/shared/hooks";

const cx = cnBind.bind(styles);



export const Chat: FC= () => {

    const {currentDialog, selectedDialog} = useAppSelector(state => state.dialogSlice)


    return (
      <div className={cx('chat')}>
        <Header className={cx('chat__header')}>
            {selectedDialog && <ChatInfo { ...currentDialog } />}
        </Header>
        <Content className={cx('chat__content')}>
          <ChatBox />
        </Content>
        <Footer className={cx('chat__footer')}>
          <MessageBox />
        </Footer>

      </div>
  );
};
