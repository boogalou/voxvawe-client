import React, { FC, useRef } from 'react';
import styles from './message.module.scss';
import cnBind from 'classnames/bind';
import { Avatar, Content, Icon, Portal } from 'shared/ui';
import { useAppSelector, useHandleActiveModal } from 'shared/hooks';
import { format } from 'date-fns';
import { InMessage } from 'shared/types/message.interface';
import Modal from 'shared/ui/modal';
import { useOnClickOutside } from 'usehooks-ts';

const cx = cnBind.bind(styles);



export const Message: FC<InMessage> = ({
  id,
  content,
  sender_id,
  is_read,
  sent_at,
  attachments,
}) => {
  const messageRef = useRef(null);

  const sentAt = format(new Date(sent_at!), 'HH:mm');
  const {account_id: accountId } = useAppSelector(state => state.userSlice.user);
  const { avatar } = useAppSelector(state => state.dialogSlice.currentDialog!);

  const { isOpen, handleOpenModal, handleCloseModal } = useHandleActiveModal();

  const outsideClickHandler = () => {};

  useOnClickOutside(messageRef, outsideClickHandler);

  return (
    <div
      className={cx('message', { 'message--you': sender_id === accountId })}
      data-message-sender-id={sender_id === accountId ? accountId + ` ${id}`: sender_id + ` ${id}` }
      ref={messageRef}
    >
      <div className={cx('message__inner')}>
        <div className={cx('message__avatar')}>
          <Avatar className={cx('message__avatar-img')} avatarImg={avatar} />
        </div>
        <div className={cx('message__body')}>
          {attachments && attachments.length > 0 ? (
            <div className={cx('message__image')} onClick={handleOpenModal}>
              <img src={attachments[0].mediumSizeUrl} alt="" className={cx('message__preview')} />
            </div>
          ) : null}
          <p className={cx('message__text')}>{content}</p>

          <div className={cx('message__info')}>
            <div className={cx('message__time')}>{sentAt}</div>
            <div className={cx('message__status')}>
              <Icon
                className={cx('message__icon', { 'message__icon--read': is_read })}
                typeIcon={'msg-status'}
              />
            </div>
          </div>
        </div>
      </div>
      <Portal>
        <Modal className={cx('message-modal')} isOpen={isOpen}>
          <Content className={cx('message-modal__content')}>
            {attachments && attachments.length > 0 ? (
              <div className={cx('message-modal__image-container')}>
                <img
                  className={cx('message-modal__image')}
                  src={attachments[0].largeSizeUrl}
                  alt=""
                />
              </div>
            ) : (
              ''
            )}
            <Icon
              typeIcon={'close'}
              className={cx('message-modal__close-button')}
              onClick={handleCloseModal}
            />
          </Content>
        </Modal>
      </Portal>
    </div>
  );
};
