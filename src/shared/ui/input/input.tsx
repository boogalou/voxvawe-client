import React, {DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes} from 'react';
import cnBind from "classnames/bind";
import styles from "./input.module.scss";


export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  className?: string;
  name?: string;
  value?: string;
  type?: string;
  error?: string;
}

const cx = cnBind.bind(styles);

export const Input = forwardRef(
    ({
       className, name, value, type, error, ...restProps
    }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {

  return (

        <input
            className={cx('input', className, {'input--error': error})}
            name={name}
            type={type}
            value={value}
            ref={ref}
            {...restProps}
        />
  );
});

Input.displayName = 'Input';
