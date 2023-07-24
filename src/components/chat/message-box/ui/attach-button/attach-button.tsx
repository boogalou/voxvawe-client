import React, { FC, ForwardedRef } from 'react';
import cnBind from 'classnames/bind';
import styles from './attach-button.module.scss';
import { IconButton } from 'shared/ui';

const cx = cnBind.bind(styles);

export interface AttachButtonPropps {
  onClick?: (evt: React.MouseEvent<HTMLDivElement>) => void;
  ref?: ForwardedRef<HTMLDivElement>
}

export const AttachButton: FC<AttachButtonPropps> = React.forwardRef( ({ onClick }, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div
      className={cx('attach__button')}
      onClick={onClick}
      ref={ref}
    >

      <IconButton
        className={cx("btn__attach")}
        typeIcon={"attach"}
      />
    </div>
  );
});