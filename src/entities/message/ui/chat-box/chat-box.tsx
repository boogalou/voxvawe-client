import React, {FC} from 'react';
import cnBind from 'classnames/bind';
import styles from './chat-box.module.scss'
import {Message} from "@/entities/message";
import {useAppSelector} from "@/shared";

const cx = cnBind.bind(styles);

export const ChatBox: FC = () => {

  const messages = useAppSelector((state) => state.messageSlice.messages)

  return (
      <div className={cx('chat-box')}>
          <div className={cx("container")}>
            {
              messages.map(message => <Message key={message.id} { ...message }/>)
            }
          </div>
      </div>
  );
};