import React, { FC } from 'react';
import styles from './search-page.module.scss';
import cnBind from 'classnames/bind';
import { useAppSelector } from 'shared/hooks';
import Contact from 'entities/contact';


const cx = cnBind.bind(styles);

export const SearchPage: FC = ({}) => {

  const { searchResult } = useAppSelector(state => state.contactsSlice)

  return (
    <ul className={cx('search-page')}>
      {
        searchResult.map((contact) => <Contact key={contact.id} {...contact} />)
      }
    </ul>
  );
};
