import React from "react";
import styles from './auth.module.scss'
import cnBind from "classnames/bind";
import { Outlet } from "react-router-dom";

const cx = cnBind.bind(styles);


export const Auth = () => {
  return (
      <div className={cx('auth')}>
        <div className={cx('container')}>
          <div className={cx('forms')}>
            <Outlet/>
          </div>
        </div>
      </div>
  );
};