import { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import {InputProps} from "../input";
import cnBind from "classnames/bind";
import styles from './icon-input.module.scss';
import { IconType } from "shared/ui/icon";
import { Icon } from "shared/ui";


const cx = cnBind.bind(styles)

interface IconInputProps extends InputProps {
  typeIcon: IconType;
  iconClassName?: string;
  onClickClear?: () => void;
  error?: string
}

export const IconInput = forwardRef(
    ({
       className, name, type, value, error, typeIcon, iconClassName, onClickClear, ...restProps
     }: IconInputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {

      return (
          <>
            <input
                className={cx('input', className, {'input--error': error})}
                name={name}
                type={type}
                value={value}
                ref={ref}
                {...restProps}
            />
            <Icon
                className={cx('input__icon', iconClassName)}
                onClick={onClickClear}
                typeIcon={typeIcon}
            />
          </>
      );
    });

IconInput.displayName = 'IconInput';