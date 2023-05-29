import React, { useState } from 'react';
import styles from './right-sidebar.module.scss';
import cnBind from 'classnames/bind';
import { Button, Content, Header, IconButton } from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { closeRightSidebar } from 'components/right-sidebar/model';
import { addContact } from 'entities/contact';

const cx = cnBind.bind(styles);

export const RightSidebar = () => {
  const dispatch = useAppDispatch();

  const contact = useAppSelector(state => state.contactsSlice.currentContact)!;

  const { accountId, email, avatar, lastSeen, bio, gender, age, id, username } = contact || {};



  const closeOnClickHandler = () => {
    dispatch(closeRightSidebar(false));
  };

  const addContactOnClickHandler = () => {
    dispatch(addContact(accountId));
  };

  return (
    <>
      <Header className={cx('right-sidebar__header')}>
        <IconButton
          className={cx('right-sidebar__close-button')}
          typeIcon={'close'}
          onClick={closeOnClickHandler}
        />
        <span className={cx('right-sidebar__title')}>{'Информация'}</span>
      </Header>
      <Content className={cx('right-sidebar__content')}>
        <div className={cx('right-sidebar__userpic')}>
          <img src={avatar} alt="userpic" width={100} height={100} />
        </div>
        <Button onClick={addContactOnClickHandler}>{'Добавить в контактлист'}</Button>
      </Content>
    </>
  );
};