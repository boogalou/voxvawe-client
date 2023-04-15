import React, {ForwardedRef} from 'react';
import cnBind from "classnames/bind";
import styles from './icon-button.module.scss';
import {Button, Icon} from "shared/ui";
import {IconType} from "@/shared/ui/icon";
import {IButtonProps} from "@/shared/ui/button/button";


const cx = cnBind.bind(styles);

export interface IconButtonProps extends IButtonProps {
  className?: string;
  typeIcon: IconType;
  ref?: ForwardedRef<HTMLButtonElement>;
}

export const IconButton = React.forwardRef(({
                                              className,
                                              typeIcon,
                                              onClick,

                                              ...restProps
                                            }: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
      <Button
          className={cx(className)}
          onClick={onClick}
          ref={ref}
          {...restProps}
      >
        <Icon typeIcon={typeIcon}/>
      </Button>
  );
});
