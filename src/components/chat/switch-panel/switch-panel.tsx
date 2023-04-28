import React from 'react';
import styles from './switch-panels.module.scss';
import cnBind from "classnames/bind";
import {IconButton, useAppDispatch, useAppSelector} from "@/shared";
import {closeChat, moveBackMiddleColumn} from "@/entities";

const cx = cnBind.bind(styles);

export const SwitchPanel = () => {

  const dispatch = useAppDispatch();

  const {isOpen} = useAppSelector(state => state.dialogSlice);

  const handleOnClick = () => {
    if (isOpen) {
      dispatch(moveBackMiddleColumn(false));
    } else {
      dispatch(closeChat(true));
    }

  }

  return (
      <div className={cx('switch-panel')}>
        <IconButton
            className={cx('switch-panel__btn')}
            typeIcon={isOpen ? 'arrow-left' : 'close'}
            onClick={handleOnClick}
        />
      </div>
  );
};
