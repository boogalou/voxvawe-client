import React, { FC, useEffect, useState } from 'react';
import cnBind from 'classnames/bind';
import styles from './details.module.scss';
import { Button, Icon, IconButton } from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { closeRightSidebar } from 'components/right-sidebar/model';
import { formatTimePassed } from 'shared/lib';
import { IContact } from '@/src/shared';
import { Contactlist } from 'components/left-sidebar/contactlist/contactlist';
import { clearCurrentContact } from 'entities/contact';
import { addNewMemberToGroupAsync } from 'entities/dialog';
import { useParams } from 'react-router-dom';

const cx = cnBind.bind(styles);

export interface DialogDetailsProps {
  id?: number;
  avatar?: string;
  username?: string;
  lastSeen?: Date;
  account_id?: string;
  members?: IContact[];
  is_online?: boolean;
  is_group?: boolean;
}

export interface INewMember {
  chatId: number;
  accountId: string;
  username?: string;
}

export const Details: FC<DialogDetailsProps> = ({
  id,
  account_id: accountId,
  avatar,
  username,
  lastSeen,
  members,
  is_online: isOnline,
  is_group: isGroup,
}) => {
  const dispatch = useAppDispatch();
  const closeRightSeidebarHandler = () => dispatch(closeRightSidebar(false));
  const clientUserId = useAppSelector(state => state.userSlice.user.account_id);
  const { rightIsOpen } = useAppSelector(state => state.rightSidebarSlice);
  const memberId = members?.filter(member => member.account_id !== clientUserId).at(0)?.account_id;
  const contact = useAppSelector(state =>
    state.contactsSlice.contacts.find(contact => contact.account_id === accountId || memberId)
  );

  const formattedLastSeen = formatTimePassed(lastSeen);

  const [addMemberIsPressed, setAddMemberIsPressed] = useState(false);

  const [selectedMembers, setSelectedMembers] = useState<INewMember[]>([]);

  const path = useParams();

  const chatId = Number(path['userId']?.match(/[0-9]/g));

  const addMemberToGroupHandler = () => {
    setAddMemberIsPressed(prevState => !prevState);
  };

  const deleteSelectedMemberHandler = (index: number) => {
    clearCurrentContact();
    const newSelectedMembers = selectedMembers.filter((_, idx) => idx !== index);
    setSelectedMembers(newSelectedMembers);
  };

  useEffect(() => {
    clearCurrentContact();

    if (accountId && chatId && username) {
      selectedMembersHandler();
    }
  }, [chatId, accountId, username]);

  const selectedMembersHandler = () => {
    const newMember: INewMember = { chatId: -1, accountId: '', username: '' };
    if (accountId && chatId && username) {
      newMember.chatId = chatId;
      newMember.accountId = accountId;
      newMember.username = username;
    }

    setSelectedMembers(prevState => [...prevState, newMember]);
  };

  const sendRequestHandler = () => {
    dispatch(addNewMemberToGroupAsync(selectedMembers));
  };

  console.log('CHAT_ID: ', chatId);
  console.log(selectedMembers);

  return (
    <div className={cx('details')}>
      <div className={cx('details__header')}>
        {addMemberIsPressed ? (
          <IconButton
            className={cx('details__button', 'details__button-back')}
            typeIcon={'arrow-left'}
            onClick={addMemberToGroupHandler}
          />
        ) : (
          <IconButton
            className={cx('details__button', 'details__button-close')}
            typeIcon={'close'}
            onClick={closeRightSeidebarHandler}
          />
        )}
        <span className={cx('details__title')}>
          {addMemberIsPressed ? 'Добавить участников' : 'Информация'}
        </span>
      </div>
      {addMemberIsPressed ? (
        <div className={cx('details__contactlist')}>
          {selectedMembers && (
            <div className={cx('details__added')}>
              {selectedMembers.map((member, index) => (
                <div className={cx('details__added-name')} key={index}>
                  {member.username}
                  <Icon
                    className={'contactlist__added-icon'}
                    typeIcon={'close'}
                    onClick={() => deleteSelectedMemberHandler(index)}
                  />
                </div>
              ))}
            </div>
          )}
          <Contactlist ignoreClick={true} />
          <div className={cx('details__button-add--position')}>
            <IconButton
              className={cx('details__button-add-request', {
                'details__button-add-request--visible': selectedMembers.length <= 0,
              })}
              typeIcon={'arrow-left'}
              onClick={sendRequestHandler}
            />
          </div>
        </div>
      ) : (
        <>
          <div className={cx('details__image')}>
            <div className={cx('details__avatar')}>
              <img className={cx('details__userpic')} src={avatar} />
              <div className={cx('details__userpic-bar')}>
                <div className={cx('details__name')}>{username}</div>
                {isGroup ? (
                  <div className={cx('details__count-members')}>
                    {members?.length + ' участников'}
                  </div>
                ) : contact?.is_online ? (
                  <div className={cx('details__status')}>{'в сети'}</div>
                ) : (
                  <div className="details__last-seen">{formattedLastSeen}</div>
                )}
              </div>
            </div>
            <div className={cx('details__about')}>
              <div className="details__email"></div>
            </div>
          </div>
          <div className={cx('details__content')}>
            <div className={cx('details__controls')}>
              {isGroup && (
                <div className={cx('details__button-add--position')}>
                  <IconButton
                    className={cx('details__button', 'details__button-add-member', {
                      'details__button-add-member--visible': !rightIsOpen,
                    })}
                    typeIcon={'add-user'}
                    onClick={addMemberToGroupHandler}
                  />
                </div>
              )}
              {isGroup ? (
                ''
              ) : contact ? (
                <Button className={cx('details__button', 'details__button-delete-contact')}>
                  Улалить из списка котактов
                </Button>
              ) : (
                <Button className={cx('details__button', 'details__button-add-contact')}>
                  Добавить в список контактов
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
