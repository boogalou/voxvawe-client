import React, { ChangeEvent, FormEvent, useState } from 'react';
import cnBind from 'classnames/bind';
import styles from './search-bar.module.scss';
import { IconInput } from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { searchContacts } from 'entities/contact';
import { setIsFocus } from 'components/left-sidebar/model/left-sidebar.slice';
import { clearSearch } from 'entities/contact/model/contacts.slice';

const cx = cnBind.bind(styles);

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputFieldClear = () => {
    setSearchTerm('');
    dispatch(clearSearch());
  };

  const handleOnClickInput = () => {
    dispatch(setIsFocus(true));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(searchContacts({ query: searchTerm }));
  };

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(evt.target.value);
    dispatch(searchContacts({ query: evt.target.value }));
  };

  return (
    <div className={cx('search')}>
      <form className={cx('search__form')} onSubmit={handleSubmit}>
        <div className={cx('search__field')}>
          <IconInput
            type="text"
            placeholder="Поиск"
            onClick={handleOnClickInput}
            onClickClear={handleInputFieldClear}
            onChange={handleOnChange}
            typeIcon={!searchTerm ? 'search' : 'clear'}
            value={searchTerm}
            className={cx('search__input')}
            iconClassName={cx('search__icon')}
          />
        </div>
      </form>
    </div>
  );
};
