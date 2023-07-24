import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import cnBind from 'classnames/bind';
import styles from './input.module.scss';

const cx = cnBind.bind(styles);

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string;
  classNameLabel?: string;
}

export const Input = forwardRef(
  (
    {
      classNameInput,
      classNameLabel,
      name,
      value,
      type,
      accept,
      ...restProps
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {

    return (
      <>
        <label className={cx(classNameLabel)}>
          <input
            className={cx('', classNameInput)}
            name={name}
            type={type}
            value={value}
            ref={ref}
            accept={accept}
            {...restProps}
          />
        </label>
      </>
    );
  }
);

Input.displayName = 'Input';
