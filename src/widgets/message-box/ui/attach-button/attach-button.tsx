import React from 'react';
import cnBind from "classnames/bind";
import styles from "./attach-button.module.scss";
import { IconButton } from "shared/ui";

const cx = cnBind.bind(styles);

export const AttachButton = () => {
  return (
      <>
        <IconButton
            className={cx("btn__attach")}
            typeIcon={"attach"}
        />
      </>
  );
};