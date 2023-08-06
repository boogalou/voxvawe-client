import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import cnBind from 'classnames/bind';
import styles from './create-group-dialog.module.scss';
import { Button, Content, Footer, Icon, IconInput, Input } from 'shared/ui';
import { Contactlist } from 'components/left-sidebar/contactlist/contactlist';
import { useAppDispatch, useAppSelector, useSelectedUploadFiles } from "shared/hooks";
import { clearCurrentContact } from 'entities/contact';
import { createGroupDataAsync } from "entities/dialog";

const cx = cnBind.bind(styles);

export interface ICreateGroupDialogProps {
  handleCloseModal: () => void;
}

export interface IInitialState  {
  accountIds: string[];
  names: string[];
};

export interface ICreateGroupData {
  accountIds: string[];
  groupName: string;
  creator: string;
  files: File | string;
}

export const CreateGroupDialog: FC<ICreateGroupDialogProps> = ({ handleCloseModal }) => {



  const dispatch = useAppDispatch()
  const { fileList, previews, handleFileSelect, clearSelectedFiles } = useSelectedUploadFiles();
  const {account_id: accountId} = useAppSelector(state => state.userSlice.user)
  const { currentContact } = useAppSelector(state => state.contactsSlice);
  const [forwardIsPressed, setForwardIsPressed] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedContacts, setSelectedContact] = useState<IInitialState>({
    accountIds: [],
    names: [],
  });

  useEffect(() => {
    selectContactHandler();
  }, [currentContact]);

  const selectContactHandler = () => {
    if (currentContact?.username && currentContact?.account_id) {
      setSelectedContact(prevState => ({
        ...prevState,
        accountIds: [...prevState.accountIds, currentContact.account_id],
        names: [...prevState.names, currentContact.username],
      }));
    }
  };

  const onChangeGrpupNameHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setGroupName(evt.target.value);
  };

  const deleteSelectedContactHandler = (idx: number) => {
    const updatedNames = selectedContacts.names.filter((_, index) => index !== idx);
    const updatedIds = selectedContacts.accountIds.filter((_, index) => index !== idx);
    setSelectedContact(prevState => ({ ...prevState, names: updatedNames }));
    setSelectedContact(prevState => ({ ...prevState, accountIds: updatedIds }));
  };

  const onForwardClickHandler = () => {
    setForwardIsPressed(true);
  };

  const onBackwardHandler = () => {
    setForwardIsPressed(false);
  };

  const onCancelHandler = () => {
    dispatch(clearCurrentContact());
    setSelectedContact({ names: [], accountIds: [] });
    setGroupName('');
    handleCloseModal();
  };
  
  
  const dispatchGroupDataHandler = () => {
    const groupData: ICreateGroupData = {
      accountIds: selectedContacts.accountIds,
      groupName: groupName,
      creator: accountId,
      files: fileList?.item(0)!,
    };
    dispatch(createGroupDataAsync(groupData));
    setSelectedContact({ names: [], accountIds: [] });
    setGroupName('');
    clearCurrentContact();
    clearSelectedFiles();
    handleCloseModal();
  }

  
  return forwardIsPressed ? (
    <div className={cx('contactlist')}>
      <div className={cx('contactlist__header')}>
        <div className={cx('contactlist__title')}>Добавить участников</div>
        <div className={cx('contactlist__added')}>
          {selectedContacts &&
            selectedContacts.names.map((name, index) => (
              <div className={cx('contactlist__added-name')} key={index}>
                {name}
                <Icon
                  className={'contactlist__added-icon'}
                  typeIcon={'close'}
                  onClick={() => deleteSelectedContactHandler(index)}
                />
              </div>
            ))}
        </div>
      </div>
      <Contactlist ignoreClick={true} />
      <div className={cx('contactlist__footer')}>
        <Button className={cx('contactlist__button', 'button__back')} onClick={onBackwardHandler}>
          {'Назад'}
        </Button>
        <Button
          className={cx('contactlist__button', 'button__create')}
          onClick={dispatchGroupDataHandler}
        >
          { 'Создать' }
        </Button>
      </div>
    </div>
  ) : (
    <div className={cx('content')}>
      <Content className={cx('content__body')}>
        <div className={cx('column__left')}>
          <div className={cx('content__field', 'field')}>
            <label className={cx('field__label')}>
              <IconInput
                className={cx('field__attach')}
                type="file"
                typeIcon={'camera'}
                accept="image/jpeg, image/png, image/gif"
                onChange={handleFileSelect}
              />
            </label>
            {previews.at(0) && (
              <div className={cx('field__preview')}>
                <div className={cx('field__preview-inner')}>
                  <img src={previews.join('')} className={cx('field__preview-img')} />
                  <div className={cx('field__icon-wrapper')} onClick={clearSelectedFiles}>
                    <Icon className={cx('field__icon-close')} typeIcon={'close'} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={cx('column__right')}>
          <div className={cx('field')}>
            <Input
              className={cx('field__input')}
              type="text"
              placeholder={'Название группы'}
              value={groupName}
              onChange={onChangeGrpupNameHandler}
            />
          </div>
        </div>
        <Footer className={cx('footer')}>
          <div className={cx('footer__button', 'footer__button-cancel')} onClick={onCancelHandler}>
            {'Отмена'}
          </div>
          <div
            className={cx('footer__button', 'footer__button-accept')}
            onClick={onForwardClickHandler}
          >
            Вперед
          </div>
        </Footer>
      </Content>
    </div>
  );
};
