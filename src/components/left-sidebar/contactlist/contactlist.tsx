import React, { FC } from "react";
import styles from './contactlist.module.scss';
import cnBind from 'classnames/bind';
import { Preloader } from 'shared/ui';
import Contact from 'entities/contact';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { setCurrentContacts } from 'entities/contact/model/contacts.slice';

const cx = cnBind.bind(styles);

export interface ContactlistProps {
  ignoreClick?: boolean
}

export const Contactlist: FC<ContactlistProps> = ({ ignoreClick }) => {

  const dispatch = useAppDispatch();
  const  contacts  = useAppSelector(state => state.contactsSlice.contacts);
  const { status } = useAppSelector(state => state.contactsSlice);



  const handleSetCurrentContact = (accountId: string) => {
    dispatch(setCurrentContacts(accountId))
  }

  return (
    <ul className={cx('contactlist')}>
      {status === 'loading' ? (
        <Preloader className={cx('contactlist__preloader')} />
      ) : (
        contacts.map(contact => <Contact key={contact.id} {...contact} handleSetCurrentContact={handleSetCurrentContact} ignoreClick={ignoreClick} />)
      )}
    </ul>
  );
};
