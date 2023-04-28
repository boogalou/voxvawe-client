import React, {FC} from "react";
import cnBind from "classnames/bind";
import styles from './chat-info.module.scss';
import {Avatar} from "@/shared/ui";
import {Link} from "react-router-dom";
import {useAppDispatch} from "@/shared";
import {moveBackMiddleColumn} from "@/entities";
import {SwitchPanel} from "@/components/chat/switch-panel";
import {IDialog} from "@/shared/types/dialog.interface";



const cx = cnBind.bind(styles);

export interface ChatInfoProps extends IDialog {

}

export const ChatInfo: FC<ChatInfoProps> = ({interlocutor_id,interlocutor_avatar,  interlocutor_name, last_message_time}) => {

  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(moveBackMiddleColumn(false));
  }

  return (
      <div className={cx('chat-info')}
           onClick={handleOnClick}

      >
        <SwitchPanel/>
        <Link to={""} className={cx('chat-info__link')}>
          <div className={cx('chat-info__avatar')}>
            <Avatar
                avatarImg={interlocutor_avatar ? interlocutor_avatar : ''}/>
          </div>
          <div className={cx('chat-info__info')}>
            <div className={cx('chat-info__name')}>{interlocutor_name}</div>
            <div className={cx('chat-info__timestamp')}>{ 'вчера' }</div>
          </div>
        </Link>
      </div>
  );
};
