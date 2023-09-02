import React from 'react';
import cnBind from 'classnames/bind';
import styles from './settings.module.scss';
import { Content, Header, IconButton } from "shared/ui";
import { useAppDispatch, useAppSelector } from "shared/hooks";
import { setIsEditProfileActive, setSettingsIsActive } from "components/left-sidebar/model/left-sidebar.slice";
import { User } from "entities/user/user";

const cx = cnBind.bind(styles);

export const Settings = () => {

  const dispatch = useAppDispatch();
  const { id, account_id, username, is_online, avatar } = useAppSelector(
    state => state.userSlice.user
  );

  const { isEditProfile } = useAppSelector(state => state.leftSidebarSlice)

  const backButtonClickHandler = () => {
    dispatch(setSettingsIsActive(false));
  }
  
  const editButtonClickHandler = () => {
    dispatch(setIsEditProfileActive(true));
  }

  return (
    !isEditProfile ?
    <div className={cx('settings')}>
      <Header className={cx('settings__header')}>
        <IconButton
          className={cx('settings__button', 'settings__button--back')}
          typeIcon={"arrow-left"}
          onClick={backButtonClickHandler}
        />

        <span className={cx('settings__title')}>{'Профиль'}</span>

        <IconButton
          className={cx('settings__button', 'settings__button--edit')}
          typeIcon={"edit"}
          onClick={editButtonClickHandler}
        />
      </Header>
      <Content className={cx('settings__content')}>
        <div className={cx('settings__image-wrapper')}>
          <img className={cx('settings__image')} src={avatar} alt="" />
          <div className={cx('settings__info-bar')}>
            <div className={cx('settings__username')}>{username}</div>
            <div className={cx('settings__status')}>{is_online && 'В сети'}</div>
          </div>
        </div>
      </Content>
    </div>
      : <User />
  );
};