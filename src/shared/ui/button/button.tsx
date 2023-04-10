import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode} from 'react';
import cnBind from "classnames/bind"
import styles from "./button.module.scss";
import {IconType} from "shared/ui/icon";


const cx = cnBind.bind(styles);

export interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
  typeIcon?: IconType;
  text?: string;
  onClick?: () => void;
  children?: ReactNode;
}


export const Button: FC<IButtonProps> = (
    {
      className,
      typeIcon,
      text,
      children,
      onClick,
      ...restProps
    }
) => {

  return (
      <button
          className={cx('button', className)}
          onClick={onClick}
          {...restProps}
      >
        <span>{text}</span>
        <span>{children}</span>
      </button>
  );
};
