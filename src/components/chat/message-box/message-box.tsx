import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import cnBind from 'classnames/bind';
import styles from './message-box.module.scss';
import { Portal, Textarea } from 'shared/ui';
import { EmojiButton } from './ui/emoji-button';
import { AttachButton } from './ui/attach-button';
import { SendButton } from './ui/send-button/send-button';
import { useResizeTextarea } from './lib/use-textarea-auto-height';
import { useAppDispatch, useAppSelector, useHandleActiveModal } from 'shared/hooks';
import { sendMessageAsync } from 'entities/dialog/api';
import { UploadFileMenu } from 'components/chat/upload-file-menu/upload-file-menu';
import { Modal } from 'shared/ui/modal/modal';
import { ModalContent } from 'components/chat/modal-content';
import { useSelectedUploadFiles } from 'shared/hooks';
import { IOutMessage } from 'shared/types/message.interface';
import { typingTextAsync } from 'entities/dialog/api/dialog.actions';

const cx = cnBind.bind(styles);

export const MessageBox = () => {
  const dispatch = useAppDispatch();
  const senderId = useAppSelector(state => state.userSlice.user.account_id);
  const recipient = useAppSelector(state => state.dialogSlice.currentDialog.members.filter(member => member.account_id !== senderId));
  const {id: chatId } = useAppSelector(state => state.dialogSlice.currentDialog);
  const { selectedEmoji } = useAppSelector(state => state.messageInputSlice);

  const [textValue, setTextValue] = useState('');
  const [attachments, setAttachment] = useState<FormData | null>(null);

  const textAreaRef = useResizeTextarea(textValue);
  const buttonType = textValue ? 'send' : 'microphone';

  const [attachButtonIsPressed, setAttachButtonIsPressed] = useState(false);

  const recipientId = recipient.map(recipient => recipient.account_id);

  const newMessage: IOutMessage = {
    chat_id: chatId,
    sender_id: senderId,
    recipient_id: JSON.stringify(recipientId),
    content: textValue,
    sent_at: new Date(),
    attachments,
  };

  const attachButtonRef = useRef<HTMLDivElement>(null);

  const keyboardSendMessageSettings = {
    default: false,
  };
  const keyboardSendMessageHandler = (evt: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (keyboardSendMessageSettings.default) {
      if (evt.key === 'Enter' && !evt.shiftKey) {
        evt.preventDefault();
        dispatch(sendMessageAsync(newMessage));
        setTextValue('');
        clearSelectedFiles();
        setAttachment(null);
      }
    } else {
      if (evt.key === 'Enter' && evt.shiftKey) {
        evt.preventDefault();
        dispatch(sendMessageAsync(newMessage));
        setTextValue('');
        clearSelectedFiles();
        setAttachment(null);
      }
    }
  };
  const clickSendMessageHandler = (): void => {
    dispatch(sendMessageAsync(newMessage));
    setTextValue('');
    clearSelectedFiles();
    setAttachment(null);
    handleCloseModal();
  };
  const sendVoiceMessageButtonHandler = () => {
    console.log('voiceMessage');
  };
  const onChangeTextInputHandler = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    const text = evt.target.value;
    setTextValue(text);

    if (text) {
      dispatch(typingTextAsync({ chatId }));
    }
  };
  const handleClickOnAttachButton = () => {
    setAttachButtonIsPressed(prevState => !prevState);
  };

  const { isOpen, handleOpenModal, handleCloseModal } = useHandleActiveModal();

  const { fileList, previews, handleFileSelect, clearSelectedFiles } =
    useSelectedUploadFiles(handleOpenModal);

  useEffect(() => {
    if (fileList) {
      const formData = new FormData();
      Array.from(fileList).forEach(file => {
        formData.append('file', file);
      });
      setAttachment(formData);
    }
  }, [fileList]);

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
            value={isOpen ? '' : textValue}
            rows={1}
            ref={textAreaRef}
            placeholder={'Message...'}
          />
        </div>
        <div className={cx('message-box__icon')}>
          <AttachButton ref={attachButtonRef} onClick={handleClickOnAttachButton} />
        </div>

        <UploadFileMenu
          attachButtonRef={attachButtonRef}
          attachButtonIsPressed={attachButtonIsPressed}
          setAttachButtonIsPressed={setAttachButtonIsPressed}
          handleFileSelect={handleFileSelect}
        />
      </div>
      <SendButton
        onClickSendText={clickSendMessageHandler}
        onClickSendVoice={sendVoiceMessageButtonHandler}
        buttonType={buttonType}
      />
      <Portal>
        <Modal className={cx('attach-modal')} isOpen={fileList ? isOpen : false}>
          <ModalContent
            files={fileList}
            previews={previews}
            clearSelectedFiles={clearSelectedFiles}
            handleCloseModal={handleCloseModal}
            messageText={textValue}
            setTextValue={setTextValue}
            clickSendMessageHandler={clickSendMessageHandler}
          />
        </Modal>
      </Portal>
    </div>
  );
};
