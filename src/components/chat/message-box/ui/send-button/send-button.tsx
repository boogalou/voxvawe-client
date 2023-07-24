import React, { FC, KeyboardEvent, MouseEvent } from "react";
import cnBind from 'classnames/bind';
import styles from './send-btutton.module.scss';
import { Button, IconButton } from "shared/ui";

const cx = cnBind.bind(styles);

export interface SendButtonProps {
  onClickSendVoice: () => void;
  onClickSendText: (evt: MouseEvent) => void;
  buttonType: 'microphone' | 'send';
}

export const SendButton: FC<SendButtonProps> = ({
  onClickSendVoice,
  onClickSendText,
  buttonType,
}) => {
  return (
    <div className={cx('send')}>
      <IconButton
        className={cx('send__btn')}
        typeIcon={buttonType}
        onClick={buttonType === 'microphone' ? onClickSendVoice : onClickSendText}
      />
    </div>
  );
};
