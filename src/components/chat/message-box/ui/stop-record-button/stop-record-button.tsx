import React, { FC } from "react";
import style from './stop-record-button.module.scss';
import cnBind from "classnames/bind";
import { IconButton } from "shared/ui";

const cx = cnBind.bind(style);

export interface StopRecordButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

export const StopRecordButton: FC<StopRecordButtonProps> = ({isVisible, onClick}) => {
  return (
    <div className={cx('stop-record', {'stop-record--visibility': isVisible})}>
      <IconButton
        className={cx('stop-record__button', { "stop-record__button--visibility": isVisible })}
        onClick={onClick}
        typeIcon={'stop-record'}
      />
    </div>
  );
};