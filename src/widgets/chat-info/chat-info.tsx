import React, {FC} from "react";
import cnBind from "classnames/bind";
import styles from './chat-info.module.scss';
import {Avatar} from "shared/ui";
import {Link} from "react-router-dom";


const cx = cnBind.bind(styles);

export interface ChatInfoProps {
  userPic?: string;
  username?: string;
  lastMsgDate?: string;
  onClick?: (evt: React.MouseEvent) => void;
}

export const ChatInfo: FC<ChatInfoProps> = ({userPic, username, lastMsgDate, onClick}) => {
  return (
      <div className={cx('chat-info')}
           onClick={onClick}
      >
        <Link to={""} className={cx('chat-info__link')}>

          <div className={cx('chat-info__avatar')}>
            <Avatar
                avatarImg={'https://images.unsplash.com/photo-1671531009361-8846ff0d7ae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80'}/>
          </div>
          <div className={cx('chat-info__info')}>
            <div className={cx('chat-info__name')}>{'Наташа'}</div>
            <div className={cx('chat-info__timestamp')}>{'был(а) 54 минты назад'}</div>
          </div>
        </Link>
      </div>
  );
};
