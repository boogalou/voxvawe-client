import React, { FC } from 'react';
import styles from './search-page.module.scss';
import cnBind from 'classnames/bind';


const cx = cnBind.bind(styles);

export const SearchPage: FC = ({}) => {
  return (
    <div className={cx('search-page')}>

    </div>
  );
};
