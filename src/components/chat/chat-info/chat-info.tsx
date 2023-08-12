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



export const ChatInfo = () => {
  const dispatch = useAppDispatch();
  const {account_id: clientUserId} = useAppSelector(state => state.userSlice.user)
  const { isTyping } = useAppSelector(state => state.dialogSlice);
  const {members, avatar, is_group, username} = useAppSelector(state => state.dialogSlice.currentDialog);
  const contact  = useAppSelector(state => state.contactsSlice.contacts.find(contact => contact.username === username ));

  const [ member ] = members?.filter(member => member.account_id !== clientUserId)  || [];


  useEffect(() => {
    if (isTyping && isTyping.time) {
      const timeoutId = setTimeout(() => {
        dispatch(clearTyping(null));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isTyping]);

  const lastSeen = formatTimePassed(member?.last_seen);
  const avatarPlaceholder = generateColor(member?.account_id);
  const initials = getInitials(username!);

  const handleOnClick = () => {
    dispatch(openRightSidebar(true));
  };

  return (
    <div className={cx('chat-info')} onClick={handleOnClick}>
      <SwitchPanel />
      <div className={cx('chat-info__link')}>
        <div className={cx('chat-info__avatar')}>
          <Avatar avatarImg={ avatar } avatarPlaceholder={avatarPlaceholder} initials={initials}/>
        </div>
        <div className={cx('chat-info__info')}>
          <div className={cx('chat-info__name')}>{ username }</div>
          {isTyping?.time ? (
            <div className={cx('chat-info__typing')}>
              <Icon className={cx('chat-info__typing-icon')} typeIcon={'typing'} />
            </div>
          ) : contact?.is_online ? (
            <div className={cx('chat-info__status')}>{'в сети'}</div>
          ) : (
             <div className={cx('chat-info__last-seen')}>{is_group ? members.length + ' участника' : lastSeen ? 'был(а) ' + lastSeen  : ''}</div>
          )}
        </div>
      </div>
    </div>
  );
};
