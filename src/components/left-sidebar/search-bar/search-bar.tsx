import React, { ChangeEvent, FormEvent, useState } from 'react';
import cnBind from 'classnames/bind';
import styles from './search-bar.module.scss';
import { IconInput } from 'shared/ui';
import { useAppDispatch } from 'shared/hooks';
import { searchUserRequest } from 'components/left-sidebar/search-bar/model';

const cx = cnBind.bind(styles);

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleInputFieldClear = () => {
    setInputValue('');
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(searchUserRequest(inputValue));
    setInputValue('');
  };

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  return (
    <div className={cx('search')}>
      <form
        className={cx('search__form')}
        onSubmit={handleSubmit}
      >
        <div className={cx('search__field')}>
          <IconInput
            type="text"
            placeholder="Поиск"
            onClick={handleInputFieldClear}
            onChange={handleOnChange}
            icon={!inputValue ? 'search' : 'clear'}
            value={inputValue}
            className={cx('search__input')}
            iconClassName={cx('search__icon')}
          />
        </div>
      </form>
    </div>
  );
};
