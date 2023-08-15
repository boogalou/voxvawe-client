import React, { FC, useState } from "react";
import { useAppSelector } from 'shared/hooks';
import styles from './added-contacts.module.scss';
import cnBind from "classnames/bind";
import { formatTimePassed } from "shared/lib";
import { IContact } from "shared/types";
import { Avatar, List } from 'shared/ui';


const cx = cnBind.bind(styles);

export interface AddedContactsProps {
  callback: (accountId: string, username: string) => void;
}

export const AddedContacts: FC<AddedContactsProps> = ({ callback }) => {
  const constants = useAppSelector(state => state.contactsSlice.contacts);

  const onClickHandler = (accountId: string, username: string) => {
    callback(accountId, username);
  }

  const renderItem = (item: IContact) => {

    return (
      <li key={item.id} className={cx('contact')} onClick={() => onClickHandler(item.account_id, item.username)}>
        <div className={cx('contact__container')}>
          <div className={cx('contact__avatar')}>
            <Avatar
              avatarImg={item.avatar}
              accountId={item.account_id}
              username={item.username}
              isOnline={item.is_online}
            />
          </div>
          <div className={cx('contact__name')}>{item.username}</div>
          <div className={cx('contact__last-visit')}>{formatTimePassed(item.last_seen)}</div>
        </div>
      </li>
    );
  };

  return (
    <ul className={cx('added-list')}>
      <List items={constants} renderItem={renderItem} />
    </ul>
  );
};

