import React from 'react';
import styles from './left-sidebar.module.scss';
import cnBind from 'classnames/bind';
import { Content, Header } from 'shared/ui';
import { MainMenu } from './main-menu';
import { SearchBar } from './search-bar';
import { Dialogs } from './dialogs';
import { useAppSelector } from 'shared/hooks';
import { SearchPage } from 'components/left-sidebar/search-page';
import { Contactlist } from 'components/left-sidebar/contactlist/contactlist';

const cx = cnBind.bind(styles);

export const LeftSidebar = () => {
  const { isFocus, isActive } = useAppSelector(state => state.leftSidebarSlice);

  return (
    <>
      <Header className={cx('left-sidebar__header')}>
        <MainMenu />
        <SearchBar />
      </Header>
      <Content className={cx('left-sidebar__content')}>
        {isFocus ? <SearchPage /> : isActive ? <Contactlist /> : <Dialogs />}
      </Content>
    </>
  );
}
