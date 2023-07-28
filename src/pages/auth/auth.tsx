import React from "react";
import styles from './auth.module.scss'
import cnBind from "classnames/bind";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Portal } from "shared/ui";

const cx = cnBind.bind(styles);


export const Auth = () => {
  return (
      <div className={cx('auth')}>
        <div className={cx('container')}>
          <div className={cx('forms')}>
            <Outlet/>
          </div>
        </div>
        <Portal>
          <Toaster position='top-left'/>
        </Portal>
      </div>
  );
};