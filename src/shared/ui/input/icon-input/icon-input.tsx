import {ForwardedRef, forwardRef} from "react";
import {InputProps} from "../input";
import cnBind from "classnames/bind";
import styles from './icon-input.module.scss';
import { IconType } from "@/shared/ui/icon";
import { Icon } from "@/shared/ui";


const cx = cnBind.bind(styles)

interface IconInputProps extends InputProps {
  icon: IconType;
  iconClassName?: string;

}

export const IconInput = forwardRef(
    ({
       className, name, type, value, error, icon, iconClassName, ...restProps
     }: IconInputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {

      return (
          <div className={cx('input-container')}>
            <input
                className={cx('input', className, {'input--error': error})}
                name={name}
                type={type}
                value={value}
                ref={ref}
                {...restProps}
            />
            <Icon typeIcon={icon} className={cx('input__icon', iconClassName)} />
          </div>
      );
    });

IconInput.displayName = 'IconInput';