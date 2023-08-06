import React from 'react';
import styles from './left-sidebar.module.scss';
import cnBind from 'classnames/bind';
import { Content, Header, Portal } from 'shared/ui';
import { MainMenu } from './main-menu';
import { SearchBar } from './search-bar';
import { Dialogs } from './dialogs';
import { useAppSelector, useHandleActiveModal } from "shared/hooks";
import { SearchPage } from 'components/left-sidebar/search-page';
import { Contactlist } from 'components/left-sidebar/contactlist/contactlist';
import Modal from 'shared/ui/modal';
import { CreateGroupDialog } from "components/left-sidebar/create-group-dialog/create-group-dialog";

const cx = cnBind.bind(styles);

export const LeftSidebar = () => {
  const { isFocus, isActive } = useAppSelector(state => state.leftSidebarSlice);
  const { isOpen, handleOpenModal, handleCloseModal} = useHandleActiveModal()
  return (
    <div>
      <Header className={cx('left-sidebar__header')}>
        <MainMenu handleOpenModal={handleOpenModal} />
        <SearchBar />
      </Header>
      <Content className={cx('left-sidebar__content')}>
        {isFocus ? <SearchPage /> : isActive ? <Contactlist /> : <Dialogs />}
      </Content>
      <Portal>
        <Modal className={cx('modal')} isOpen={isOpen}>
          {<CreateGroupDialog handleCloseModal={handleCloseModal} />}
        </Modal>
      </Portal>
    </div>
  );
};
