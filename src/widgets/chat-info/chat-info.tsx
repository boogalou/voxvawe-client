import React, {FC} from "react";
import cnBind from "classnames/bind";
import styles from './chat-info.module.scss';
import {Avatar} from "shared/ui";
import {Link} from "react-router-dom";
import {useAppDispatch} from "@/shared";
import {moveBackMiddleColumn} from "@/entities";
import {SwitchPanel} from "@/features/switch-panel";



const cx = cnBind.bind(styles);

export interface ChatInfoProps {
  userId?: number;
  userPic?: string;
  fullName?: string;
  isOnline?: boolean;
  lastMsgDate?: string;
}

export const ChatInfo: FC<ChatInfoProps> = ({userId, userPic,  fullName, lastMsgDate}) => {

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
                avatarImg={userPic ? userPic : ''}/>
          </div>
          <div className={cx('chat-info__info')}>
            <div className={cx('chat-info__name')}>{fullName}</div>
            <div className={cx('chat-info__timestamp')}>{ lastMsgDate }</div>
          </div>
        </Link>
      </div>
  );
};
