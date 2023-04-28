import React from 'react';
import styles from './left-sidebar.module.scss';
import cnBind from 'classnames/bind';
import { Content, Header, Preloader } from 'shared/ui';
import { MainMenu } from './main-menu';
import { SearchBar } from './search-bar';
import { Dialogs } from './dialogs';
import { useAppSelector } from 'shared/hooks';

const cx = cnBind.bind(styles);

export function LeftSidebar() {
  const { status } = useAppSelector(state => state.dialogSlice);

  return (
    <>
      <Header className={cx('left-sidebar__header')}>
        <MainMenu />
        <SearchBar />
      </Header>
      <Content className={cx('left-sidebar__content')}>
        <Dialogs />
      </Content>
    </>
  );
}
