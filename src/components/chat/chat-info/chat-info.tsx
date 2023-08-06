import React, { FC, useEffect } from 'react';
import cnBind from 'classnames/bind';
import styles from './chat-info.module.scss';
import { Avatar, Icon } from 'shared/ui';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { SwitchPanel } from 'components/chat/switch-panel';
import { openRightSidebar } from 'components/right-sidebar/model';
import { formatTimePassed, generateColor, getInitials } from "shared/lib";
import { clearTyping } from "entities/dialog";

const cx = cnBind.bind(styles);

export interface ChatInfoProps {
  selectedDialog: string;
}

export const ChatInfo: FC<ChatInfoProps> = ({ selectedDialog }) => {
  const dispatch = useAppDispatch();
  const { isTyping } = useAppSelector(state => state.dialogSlice);
  const contact = useAppSelector(state => state.contactsSlice.contacts.find(contact => contact?.account_id === selectedDialog));
  const {group_avatar, group_name, lastMessage} = useAppSelector(state => state.dialogSlice.currentDialog);

  useEffect(() => {
    if (isTyping && isTyping.time) {
      const timeoutId = setTimeout(() => {
        dispatch(clearTyping(null));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isTyping]);

  const { username, avatar, last_seen, is_online, account_id: accountId } = contact || {};

  const lastSeen = formatTimePassed(last_seen);
  const avatarPlaceholder = generateColor(accountId!);
  const initials = getInitials(username!);

  const handleOnClick = () => {
    dispatch(openRightSidebar(true));
  };

  return (
    <div className={cx('chat-info')} onClick={handleOnClick}>
      <SwitchPanel />
      <Link to={''} className={cx('chat-info__link')}>
        <div className={cx('chat-info__avatar')}>
          <Avatar avatarImg={group_avatar ? group_avatar : avatar} avatarPlaceholder={avatarPlaceholder} initials={initials}/>
        </div>
        <div className={cx('chat-info__info')}>
          <div className={cx('chat-info__name')}>{group_name ? group_name : username}</div>
          {isTyping?.time ? (
            <div className={cx('chat-info__typing')}>
              <Icon className={cx('chat-info__typing-icon')} typeIcon={'typing'} />
            </div>
          ) : is_online ? (
            <div className={cx('chat-info__status')}>{'в сети'}</div>
          ) : (
             <div className={cx('chat-info__last-seen')}>{ lastSeen ? 'был(а) ' + lastSeen : ''}</div>
          )}
        </div>
      </Link>
    </div>
  );
};
