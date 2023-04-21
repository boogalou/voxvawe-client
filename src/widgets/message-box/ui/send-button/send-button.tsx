import React, {FC} from 'react';
import cnBind from "classnames/bind";
import styles from "./send-btutton.module.scss";
import { Button } from "shared/ui";


const cx = cnBind.bind(styles);

export interface SendButtonProps {
  onClickCb: [fn: () => void, fn: () => void];
  buttonType: "microphone" | "send"
}

export const SendButton: FC<SendButtonProps> = ({ onClickCb, buttonType }) => {

  const [sendTextMessage, sendVoiceMessage] = onClickCb;

  return (
      <div className={cx("send")}>
        <Button
            className={cx("send__btn")}
            typeIcon={buttonType}
            onClick={
              buttonType === "microphone"
                  ? sendVoiceMessage
                  : sendTextMessage
            }
        />

      </div>
  );
};
