import React, { FC, useState } from 'react';
import styles from './search-page.module.scss';
import cnBind from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import Contact from 'entities/contact';
import { setSelectedContact } from 'entities/contact/model/contacts.slice';


const cx = cnBind.bind(styles);

export const SearchPage: FC = ({}) => {
  const dispatch = useAppDispatch();

  const [currentContact, setCurrentContact] = useState('');

  const handleSetCurrentContact = (accountId: string) => {
    dispatch(setSelectedContact(accountId))
  };

  console.log(currentContact);

  const { searchResult } = useAppSelector(state => state.contactsSlice);

  return (
    <ul className={cx('search-page')}>
      {searchResult.map(contact => (
        <Contact key={contact.id} {...contact} handleSetCurrentContact={handleSetCurrentContact} />
      ))}
    </ul>
  );
};
