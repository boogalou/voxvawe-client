import React from 'react';
import styles from './right-sidebar.module.scss';
import cnBind from 'classnames/bind';
import { useAppSelector } from 'shared/hooks';
import { Details } from './details';

const cx = cnBind.bind(styles);

export const RightSidebar = () => {

  const contact = useAppSelector(state => state.contactsSlice.currentContact);
  const dialog = useAppSelector(state => state.dialogSlice.currentDialog);
  
  return (
    <>
      <div className={cx('right-sidebar__header')}></div>
      <div className={cx('right-sidebar__content')}>
        <Details {...(contact ? contact : dialog)} />
      </div>
    </>
  );
};
