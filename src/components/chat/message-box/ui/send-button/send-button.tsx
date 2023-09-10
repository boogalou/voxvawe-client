import React, { FC, MouseEvent } from 'react';
import cnBind from 'classnames/bind';
import styles from './send-btutton.module.scss';
import { IconButton } from 'shared/ui';

const cx = cnBind.bind(styles);

export interface SendButtonProps {
  onClick: (evt: MouseEvent) => void;
  onClickRecord: () => void;
  textValue: string;

}

export const SendButton: FC<SendButtonProps> = ({ textValue, onClick, onClickRecord, }) => {

  const buttonType = textValue ? 'send' : 'microphone'

  return (
    <div className={cx('send')}>
      <IconButton
        className={cx('send__btn')}
        typeIcon={buttonType}
        onClick={buttonType === 'send' ? onClick : onClickRecord }
      />
    </div>
  );
};
