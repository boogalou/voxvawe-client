import React, {FC} from 'react';
import cnBind from 'classnames/bind';
import styles from './chat-box.module.scss'
import {Message} from "@/entities/message";
import {useAppSelector} from "@/shared";
import {useParams} from "react-router";

const cx = cnBind.bind(styles);

export const ChatBox: FC = () => {

  const {userId} = useParams<{userId: string }>();

  console.log('user id: ', userId);

  const messages = useAppSelector((state) => state.messageSlice.messages)

  return (
      <div className={cx('chat-box')}>

            {
              messages.map(message => <Message key={message.id} { ...message }/>)
            }

      </div>
  );
};