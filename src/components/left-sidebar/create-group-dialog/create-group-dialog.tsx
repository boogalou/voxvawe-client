import React, { ChangeEvent, FC, useState } from 'react';
import cnBind from 'classnames/bind';
import styles from './create-group-dialog.module.scss';
import { Button, Content, Footer, Icon, IconInput, Input } from 'shared/ui';
import { useAppDispatch, useAppSelector, useSelectedUploadFiles } from 'shared/hooks';
import { createGroupDataAsync } from 'entities/dialog';
import { AddedContacts } from 'components/left-sidebar/create-group-dialog/added-contacts/added-contacts';

const cx = cnBind.bind(styles);

export interface ICreateGroupDialogProps {
  handleCloseModal: () => void;
}

export interface ICreateGroupData {
  accountIds: string[];
  groupName: string;
  creator: string;
  files: File | string;
}

export interface IMemberData {
  accountId: string;
  name: string;
}

export const CreateGroupDialog: FC<ICreateGroupDialogProps> = ({ handleCloseModal }) => {
  const dispatch = useAppDispatch();
  const { fileList, previews, handleFileSelect, clearSelectedFiles } = useSelectedUploadFiles();
  const { account_id: accountId } = useAppSelector(state => state.userSlice.user);
  const [forwardIsPressed, setForwardIsPressed] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [addedMember, setAddedMember] = useState<IMemberData[]>([]);

  const getMemberData = (accountId: string, username: string) => {
    const newMember = {
      name: username,
      accountId: accountId,
    };
    setAddedMember(prevState => {
      const memberExists = prevState.some(item => item.accountId === accountId);
      if (memberExists) {
        return prevState;
      }

      return [...prevState, newMember];
    });
  };

  const deleteSelectedContactHandler = (index: number) => {
    setAddedMember(prevState => prevState.filter((_, idx) => idx !== index));
  };

  const onChangeGroupNameHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setGroupName(evt.target.value);
  };

  const onForwardClickHandler = () => {
    setForwardIsPressed(true);
  };

  const onBackwardHandler = () => {
    setForwardIsPressed(false);
  };

  const onCancelHandler = () => {
    setGroupName('');
    handleCloseModal();
  };

  const dispatchGroupDataHandler = () => {
    const groupData: ICreateGroupData = {
      accountIds: [...addedMember.map(member => member.accountId)],
      groupName: groupName,
      creator: accountId,
      files: fileList?.item(0)!,
    };
    dispatch(createGroupDataAsync(groupData));
    setAddedMember([]);
    setGroupName('');
    clearSelectedFiles();
    handleCloseModal();
  };

  return forwardIsPressed ? (
    <div className={cx('contactlist')}>
      <div className={cx('contactlist__header')}>
        <div className={cx('contactlist__title')}>Добавить участников</div>
        <div className={cx('contactlist__added')}>
          {addedMember &&
            addedMember.map((member, index) => (
              <div className={cx('contactlist__added-name')} key={index}>
                {member.name}
                <Icon
                  className={'contactlist__added-icon'}
                  typeIcon={'close'}
                  onClick={() => deleteSelectedContactHandler(index)}
                />
              </div>
            ))}
        </div>
      </div>
      <AddedContacts callback={getMemberData} />
      <div className={cx('contactlist__footer')}>
        <Button className={cx('contactlist__button', 'button__back')} onClick={onBackwardHandler}>
          {'Назад'}
        </Button>
        <Button
          className={cx('contactlist__button', 'button__create')}
          onClick={dispatchGroupDataHandler}
        >
          {'Создать'}
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
                typeIcon={'camera'}
                type="file"
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
              onChange={onChangeGroupNameHandler}
            />
          </div>
        </div>
        <Footer className={cx('footer')}>
          <Button
            className={cx('footer__button', 'footer__button-cancel')}
            onClick={onCancelHandler}
          >
            {'Отмена'}
          </Button>
          <Button
            className={cx('footer__button', 'footer__button-accept')}
            onClick={onForwardClickHandler}
            disabled={!groupName}
          >
            Вперед
          </Button>
        </Footer>
      </Content>
    </div>
  );
};
