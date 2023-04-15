import React, {ChangeEvent, useState} from 'react';
import cnBind from "classnames/bind";
import styles from './search.module.scss';
import { IconInput } from "shared/ui";

const cx = cnBind.bind(styles)

export const Search = () => {

  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  }
  console.log()
  return (
      <div className={cx('search')}>
        <div className={cx('search__field')}>
          <IconInput
              type='text'
              placeholder='Поиск'
              onChange={handleOnChange}
              icon='search'
              value={inputValue}
              className={cx('search__input')}
              iconClassName={cx('search__icon')}
          />
        </div>
      </div>
  );
};