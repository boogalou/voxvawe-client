import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import cnBind from "classnames/bind";
import { Button, Content, Footer, Header, Icon, Input } from "shared/ui";
import styles from "./modal-content.module.scss";
import { formatFileSize } from "shared/lib";

const cx = cnBind.bind(styles);

export interface ModalContentProps {
  files: FileList | null;
  previews: string[];
  messageText: string;
  clearSelectedFiles: () => void;
  handleCloseModal: () => void;
  setTextValue: Dispatch<SetStateAction<string>>;
  clickSendMessageHandler: () => void;
}

export const ModalContent: FC<ModalContentProps> = ({
                                                      files,
                                                      previews,
                                                      clearSelectedFiles,
                                                      handleCloseModal,
                                                      messageText,
                                                      setTextValue,
                                                      clickSendMessageHandler
                                                    }) => {
  const handleOnClickClose = () => {
    clearSelectedFiles();
    handleCloseModal();
  };

  const handleMessageText = (evt: ChangeEvent<HTMLInputElement>) => {
    setTextValue(evt.target.value);
  };

  return (
    <div className={cx("content")}>
      <Header className={cx("content__header")}>
        <div className={cx("content__title")}>
          <p>{`Отправить ${1} файл`}</p>
        </div>
        <div className={cx("content__close")} onClick={handleOnClickClose}>
          <Icon className={cx("content__close-button")} typeIcon={"close"} />
        </div>
      </Header>
      <Content className={cx("content__section")}>
        {files ? (
          Array.from(files).map((item, index) => (
            <React.Fragment key={index}>
              <div>{item.name}</div>
              <div>{formatFileSize(item.size)}</div>
              <div className={cx("content__preview")}>
                {previews[index] && (
                  <img className={cx("content__image")} src={previews[index]} alt="Preview" />
                )}
              </div>
            </React.Fragment>
          ))
        ) : (
          <div>Файлы не выбраны</div>
        )}
      </Content>
      <Footer>
        <form className={cx("content__form")}>
          <Input
            className={cx("content__input")}
            value={messageText}
            onChange={handleMessageText}
            placeholder={"Добавить..."}
          />
          <Button
            className={cx("content__button")}
            text="Отправить"
            onClick={clickSendMessageHandler}
          />
        </form>
      </Footer>
    </div>
  );
};
