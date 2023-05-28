import React, { FC } from 'react';
import cnBind from 'classnames/bind';
import styles from './chat-info.module.scss';
import { Avatar } from 'shared/ui';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks';
import { SwitchPanel } from 'components/chat/switch-panel';
import { openRightSidebar } from 'components/right-sidebar/model';

const cx = cnBind.bind(styles);

export interface ChatInfoProps  {
  id?: number;
  name?: string;
  interlocutorId?: string;
  interlocutorName?: string;
  interlocutorAvatar?: string;
  lastMessageTime?: Date;
}

export const ChatInfo: FC<ChatInfoProps> = ({
  interlocutorId,
  interlocutorAvatar,
  interlocutorName,
  lastMessageTime,
}) => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(openRightSidebar(true));
  };

  return (
    <div className={cx('chat-info')} onClick={handleOnClick}>
      <SwitchPanel />
      <Link to={''} className={cx('chat-info__link')}>
        <div className={cx('chat-info__avatar')}>
          <Avatar avatarImg={interlocutorAvatar ? interlocutorAvatar : ''} />
        </div>
        <div className={cx('chat-info__info')}>
          <div className={cx('chat-info__name')}>{interlocutorName}</div>
          <div className={cx('chat-info__timestamp')}>{'вчера'}</div>
        </div>
      </Link>
    </div>
  );
};
