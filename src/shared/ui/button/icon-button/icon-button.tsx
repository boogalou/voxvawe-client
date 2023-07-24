import React, { FormEvent, ForwardedRef } from "react";
import cnBind from 'classnames/bind';
import styles from './icon-button.module.scss';
import { Button, Icon } from 'shared/ui';
import { IconType } from 'shared/ui/icon';
import { IButtonProps } from 'shared/ui/button/button';

const cx = cnBind.bind(styles);

export interface IconButtonProps extends IButtonProps {
  className?: string;
  classNameIcon?: string;
  typeIcon?: IconType;
  onClick?: (evt: React.MouseEvent) => void;
  ref?: ForwardedRef<HTMLButtonElement>;
  children?: React.ReactNode;
}

export const IconButton = React.forwardRef(
  (
    { className, classNameIcon, typeIcon, onClick, children, ...restProps }: IconButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <Button className={cx('btn', className)} onClick={onClick} ref={ref} {...restProps}>
        {children}
        {typeIcon && <Icon className={classNameIcon} typeIcon={typeIcon} />}
      </Button>
    );
  }
);
