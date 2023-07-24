import React from 'react';
import cnBind from 'classnames/bind';
import styles from './modal.module.scss';

const cx = cnBind.bind(styles);

interface ModalProps {
  isOpen?: boolean;
  className?: string
  onClose?: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={cx('modal', className)}>
      <div className={cx('modal__overlay')} onClick={onClose}></div>
      <div className={cx('modal__content')}>
        { children }
      </div>
    </div>
  );
};
