import React, { ChangeEvent, Dispatch, FC, RefObject, SetStateAction, useRef } from 'react';
import { Dropdown, Icon, Input } from 'shared/ui';
import cnBind from 'classnames/bind';
import styles from './upload-file-menu.module.scss';
import { useOnClickOutside } from 'usehooks-ts';

const cx = cnBind.bind(styles);

export interface UploadFileMenuProps {
  attachButtonRef: RefObject<HTMLDivElement>;
  handleFileSelect: (evt: ChangeEvent<HTMLInputElement>) => void;
  setAttachButtonIsPressed: Dispatch<SetStateAction<boolean>>;
  attachButtonIsPressed: boolean;
}

export const UploadFileMenu: FC<UploadFileMenuProps> = ({
  attachButtonRef,
  attachButtonIsPressed,
  setAttachButtonIsPressed,
  handleFileSelect,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropDownRef = useRef<HTMLUListElement>(null);

  const handleOutsideClick = (evt: MouseEvent) => {
    if (!attachButtonRef.current?.contains(evt.target as Node)) {
      setAttachButtonIsPressed(false);
    }
  };

  useOnClickOutside(dropDownRef, handleOutsideClick);

  const choseFileTypeMenu = [
    {
      id: 1,
      title: 'Фото или видео',
      icon: <Icon typeIcon={'file-img'} />,
      elements: [
        <Input
          ref={inputRef}
          className={cx('dropdown__input')}
          classNameLabel={'dropdown__label'}
          type="file"
          accept="image/png, image/jpeg, image/gif"
          formEncType="multipart/form-data"
        />,
      ],
    },
    {
      id: 2,
      title: 'Файл',
      icon: <Icon typeIcon={'file'} />,
      elements: [
        <Input
          ref={inputRef}
          className={cx('dropdown__input')}
          classNameLabel={'dropdown__label'}
          type="file"
          accept="file/*"
        />,
      ],
    },
  ];

  const handleMenuItemClick = () => {
    setAttachButtonIsPressed(false);
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.click();
    }
  };

  return (
    <div
      className={cx(
        'attach-menu',
        { 'attach-menu--isActive': attachButtonIsPressed },
        { 'scale-up-bottom': attachButtonIsPressed }
      )}
    >
      <Dropdown
        ref={dropDownRef}
        className={cx('dropdown__menu')}
        classNameItem={cx('dropdown__menu-element')}
        items={choseFileTypeMenu}
        onClickMenuItem={handleMenuItemClick}
        onChange={handleFileSelect}
      />
    </div>
  );
};
