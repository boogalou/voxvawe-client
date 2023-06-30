import React, {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import cnBind from 'classnames/bind';
import styles from './message-box.module.scss';
import { Textarea } from 'shared/ui';
import { EmojiButton } from './ui/emoji-button';
import { AttachButton } from './ui/attach-button';
import { SendButton } from './ui/send-button/send-button';
import { useResizeTextarea } from './lib/use-textarea-auto-height';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { IMessage } from 'shared/types';
import { sendMessageAsync } from 'entities/dialog/api';

const cx = cnBind.bind(styles);

export const MessageBox = () => {
  const dispatch = useAppDispatch();
  const { accountId } = useAppSelector(state => state.userSlice.user);
  const recipientId = useAppSelector(state => state.dialogSlice.currentDialog.accountId);
  const chatId = useAppSelector(state => state.dialogSlice.currentDialog.id);
  const { selectedEmoji } = useAppSelector(state => state.messageInputSlice);
  const [textValue, setTextValue] = useState('');
  const textAreaRef = useResizeTextarea(textValue);
  const buttonType = textValue ? 'send' : 'microphone';

  type OutMessage = Omit<IMessage, 'messageId' | 'isRead' | 'isDelivered' | 'is_deleted' | 'editAt'>;

  const newMessage: OutMessage = {
    chatId: chatId,
    senderId: accountId,
    recipientId: recipientId,
    content: textValue,
    sentAt: new Date(),
    attachments: [],
  };

  console.log('newMessage: ', newMessage);

  const keyboardSendMessageSettings = {
    default: false,
  };

  const keyboardSendMessageHandler = (evt: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (keyboardSendMessageSettings.default) {
      if (evt.key === 'Enter' && !evt.shiftKey) {
        evt.preventDefault();
        dispatch(sendMessageAsync(newMessage as IMessage));
        setTextValue('');
      }
    } else {
      if (evt.key === 'Enter' && evt.shiftKey) {
        evt.preventDefault();
        dispatch(sendMessageAsync(newMessage as IMessage));
        setTextValue('');
      }
    }
  };

  const clickSendMessageHandler = (): void => {
    dispatch(sendMessageAsync(newMessage as IMessage));
    setTextValue('');
  };

  const sendVoiceMessageButtonHandler = () => {
    console.log('voiceMessage');
  };

  const onChangeTextInputHandler = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    const text = evt.target.value;
    setTextValue(text);
  };

  useEffect(() => {
    if (selectedEmoji) {
      setTextValue(prevState => prevState + selectedEmoji.native);
    }
  }, [selectedEmoji]);

  return (
    <div className={cx('message-box')}>
      <div className={cx('message-box__container')} tabIndex={0}>
        <div className={cx('message-box__icon')}>
          <EmojiButton />
        </div>
        <div className={cx('message-box__textarea')}>
          <Textarea
            onKeyDown={keyboardSendMessageHandler}
            className={cx('message-box__input')}
            onChange={onChangeTextInputHandler}
            value={textValue}
            rows={1}
            ref={textAreaRef}
            placeholder={'Message...'}
          />
        </div>
        <div className={cx('message-box__icon')}>
          <AttachButton />
        </div>
      </div>
      <SendButton
        onClickSendText={clickSendMessageHandler}
        onClickSendVoice={sendVoiceMessageButtonHandler}
        buttonType={buttonType}
      />
    </div>
  );
};
