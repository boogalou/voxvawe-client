import React from 'react';
import styles from './switch-panels.module.scss';
import cnBind from 'classnames/bind';
import { IconButton } from 'shared/ui';
import { closeChat, leaveRoomAsync, moveBackMiddleColumn } from "entities/dialog";
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { useNavigate } from "react-router-dom";

const cx = cnBind.bind(styles);

export const SwitchPanel = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { isOpen } = useAppSelector(state => state.dialogSlice);
  const { id: chatId } = useAppSelector(state => state.dialogSlice.currentDialog);
  const { account_id: accountId } = useAppSelector(state => state.userSlice.user);

  const handleOnClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (isOpen) {
      dispatch(moveBackMiddleColumn(false));
    } else {
      dispatch(leaveRoomAsync({chatId,  accountId}));
      dispatch(closeChat(true));
      navigate('/');
    }
  };

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
