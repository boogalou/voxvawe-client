import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import cnBind from 'classnames/bind';
import styles from './message-box.module.scss';
import { IconButton, Portal, Textarea } from 'shared/ui';
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
import { StopRecordButton } from 'components/chat/message-box/ui/stop-record-button';
import { RecordTimer } from 'components/chat/message-box/ui/record-timer';
import { getFormData } from 'shared/lib';
import { useRecorder } from 'components/chat/message-box/hooks/use-recorder';

const cx = cnBind.bind(styles);

export const MessageBox = () => {
  const dispatch = useAppDispatch();
  const senderId = useAppSelector(state => state.userSlice.user.account_id);
  const recipient = useAppSelector(state =>
    state.dialogSlice.currentDialog.members.filter(member => member.account_id !== senderId)
  );
  const { id: chatId } = useAppSelector(state => state.dialogSlice.currentDialog);
  const { selectedEmoji } = useAppSelector(state => state.messageInputSlice);

  const attachButtonRef = useRef<HTMLDivElement>(null);
  const [textValue, setTextValue] = useState('');
  const textAreaRef = useResizeTextarea(textValue);
  const [attachments, setAttachment] = useState<FormData | null>(null);
  const [attachButtonIsPressed, setAttachButtonIsPressed] = useState(false);
  const [stopRecordButtonIsVisible, setStopRecordButtonIsVisible] = useState(false);
  const [microphoneButtonIsPressed, setMicrophoneButtonIsPressed] = useState(false);
  const [audioFormData, setAudioFormData] = useState<FormData | null>(null);
  const { startRecording, stopRecord, cancelRecording, audioData } = useRecorder();
  const recipientId = recipient.map(recipient => recipient.account_id);

  const newMessage: IOutMessage = {
    chat_id: chatId,
    sender_id: senderId,
    recipient_id: JSON.stringify(recipientId),
    content: textValue,
    sent_at: new Date(),
    attachments,
    voice_message: audioFormData,
  };

  const keyboardSendMessageSettings = {
    default: true,
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

  const clickSendMessageHandler = async (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(sendMessageAsync(newMessage));
    textAreaRef.current!.focus();
    setTextValue('');
    clearSelectedFiles();
    setAttachment(null);
    handleCloseModal();
  };

  const sendVoiceMessageHandler = async () => {
    await stopRecord();
    setMicrophoneButtonIsPressed(prevState => !prevState);
    setStopRecordButtonIsVisible(prevState => !prevState);
  };
  const startRecordVoiceHandler = async () => {
    setMicrophoneButtonIsPressed(prevState => !prevState);
    setStopRecordButtonIsVisible(prevState => !prevState);
    await startRecording();
  };

  const stopRecordVoiceHandler = () => {
    cancelRecording();
    setStopRecordButtonIsVisible(prevState => !prevState);
    setMicrophoneButtonIsPressed(prevState => !prevState);
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

  useEffect(() => {
    audioData ? setAudioFormData(getFormData(audioData)) : setAudioFormData(null);
  }, [audioData]);

  useEffect(() => {
    if (audioFormData) {
      dispatch(sendMessageAsync(newMessage));
    }
    setAudioFormData(null);
  }, [audioFormData]);

  return (
    <>
      <div className={cx('message-box')}>
        <div className={cx('message-box__container', {'message-box__container--timer' : microphoneButtonIsPressed})} tabIndex={0}>
          {microphoneButtonIsPressed ? (
            <RecordTimer microphoneButtonIsPressed={microphoneButtonIsPressed} />
          ) : (
            <>
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
            </>
          )}
        </div>

        <div className={cx('message-box__controls')}>
          {microphoneButtonIsPressed ? (
            <div className={cx('message-box__voice')}>
              <StopRecordButton
                onClick={stopRecordVoiceHandler}
                isVisible={stopRecordButtonIsVisible}
              />

              <IconButton
                className={cx('message-box__send-voice')}
                typeIcon={'send'}
                onClick={sendVoiceMessageHandler}
              />
            </div>
          ) : (
            <SendButton
              onClick={clickSendMessageHandler}
              onClickRecord={startRecordVoiceHandler}
              textValue={textValue}
            />
          )}
        </div>
      </div>
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
    </>
  );
};
