import React, { ChangeEvent, useEffect, useState } from 'react';
import cnBind from "classnames/bind";
import styles from "./message-box.module.scss";
import {Input, Textarea} from "shared/ui";
import { EmojiButton } from "./ui/emoji-button";
import { AttachButton } from './ui/attach-button';
import { SendButton } from "./ui/send-button/send-button";
import { useResizeTextarea } from "./lib/use-textarea-auto-height";
import {useAppDispatch, useAppSelector} from "@/shared/hooks";
import { addMessage, sendMessageThunk } from '@/entities/message';
import {IMessage} from "@/entities/message/model/message.slice";






const cx = cnBind.bind(styles);

export const MessageBox = () => {

  const dispatch = useAppDispatch();
  const selectedEmoji = useAppSelector(state => state.messageInputSlice.selectedEmoji);
  const [textValue, setTextValue] = useState('');
  const textAreaRef = useResizeTextarea(textValue);
  const buttonType = textValue ? "send" : "microphone"

  const onChangeTextInputHandler = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    setTextValue(evt.target.value);

  }

  useEffect(() => {
    if (selectedEmoji) {
      setTextValue(prevState => prevState + selectedEmoji.native);
    }
  }, [selectedEmoji]);

  const sendMessageButtonHandler = (): void => {
    const newMessage: IMessage = {
      userId: 100,
      text: textValue,
      timestamp: Date.now().toString(),
      isRead: false,
      isGroup: false,
      attachments: [],
      id: 23
    }



    dispatch(addMessage(newMessage))
    dispatch(sendMessageThunk(newMessage))
    setTextValue("");
  }

  const sendVoiceMessageButtonHandler = () => {
    console.log("voiceMessage");
  }


  return (
      <div className={cx("message-box")}>
        <div className={cx("message-box__container")}>
          <div className={cx("message-box__icon")}>
            <EmojiButton/>
          </div>
          <div className={cx("message-box__textarea")}>
            <Textarea
                className={cx("message-box__input")}
                onChange={onChangeTextInputHandler}
                value={textValue}
                rows={1}
                ref={textAreaRef}
                placeholder={"Message..."}

            />
          </div>
          <div className={cx("message-box__icon")}>
             <AttachButton/>
          </div>
        </div>
        <SendButton
            onClickCb={[sendMessageButtonHandler, sendVoiceMessageButtonHandler]}
            buttonType={buttonType}/>
      </div>
  );
};
