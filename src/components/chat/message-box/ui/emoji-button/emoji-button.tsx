import React, { useRef, useState } from 'react';
import Picker from '@emoji-mart/react';
import emojiMartData from "@emoji-mart/data/sets/14/google.json"
import cnBind from "classnames/bind";
import { IconButton } from "@/shared/ui";
import styles from "./emoji-button.module.scss";
import { useDispatch } from "react-redux";
import { IEmoji, setEmojiHandler } from "../../model";
import {useOnClickOutside} from "usehooks-ts";


const cx = cnBind.bind(styles);


export const EmojiButton = () => {

  const dispatch = useDispatch();

  const [isPressed, setIsPressed] = useState(false);
  const onButtonClickHandler = () => {
    setIsPressed(prevState => !prevState)
  };

  const pickerRef = useRef(null);

  const onSelectEmojiHandler = (emoji: IEmoji) => {
    dispatch(setEmojiHandler(emoji));
  }

  useOnClickOutside(pickerRef, () => false)

  return (
      <div
          className={cx("emoji", { "emoji--isPressed": isPressed })}
          ref={pickerRef}
      >
        <div className={cx("emoji__picker")}>
          <Picker
              set="apple"
              emojiSize={26}
              theme={'dark'}
              data={ emojiMartData }
              onEmojiSelect={onSelectEmojiHandler}
          />
        </div>
        <IconButton
            className={cx("emoji__btn", {"emoji__btn--active": isPressed})}
            onClick={onButtonClickHandler}
            typeIcon={"emoji"}
        />
      </div>

  );
};
