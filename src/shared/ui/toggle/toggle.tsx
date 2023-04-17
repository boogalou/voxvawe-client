import React, { ForwardedRef, forwardRef} from 'react';
import cnBind from "classnames/bind";
import styles from './toggle.module.scss';


const cx = cnBind.bind(styles);

export interface IToggleProps {
  className?: string;
  name: string;
  onChange?: (React.ChangeEventHandler<HTMLInputElement>);
  check?: boolean;
}

export const Toggle = ({className, name, check, onChange}: IToggleProps) => {
  return (
      <label htmlFor={name} className={cx('toggle')}>
        <input
            className={cx('toggle__input')}
            id={name}
            name={name}
            type="checkbox"
            checked={check}
            onChange={onChange}

        />
        <span className={cx('toggle__slider')}></span>
      </label>
  );
};
