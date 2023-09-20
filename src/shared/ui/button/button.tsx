import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from 'react';
import cnBind from 'classnames/bind';
import styles from './button.module.scss';

const cx = cnBind.bind(styles);

export interface IButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
  text?: string;
  children?: ReactNode;
  onClick?: (evt: React.MouseEvent) => void;
}

export const Button = forwardRef(({ className, text, children, onClick, ...restProps }: IButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button
        className={cx(className)}
        onClick={onClick}
        ref={ref}
        {...restProps}
      >
        {text}
        {children}
      </button>
    );
  }
);
