import React from 'react';
import styles from './user.module.scss';
import cnBind from 'classnames/bind';
import { Avatar, Content, Header, Icon, IconButton, Input, Portal } from 'shared/ui';
import {
  useAppDispatch,
  useAppSelector,
  useHandleActiveModal,
  useSelectedUploadFiles,
} from 'shared/hooks';
import { setIsEditProfileActive } from 'components/left-sidebar/model/left-sidebar.slice';
import { useFormik } from 'formik';
import { updateUserProfileAsync } from 'entities/user/api';
import { validName } from 'entities/auth/validation-rules';
import * as Yup from 'yup';
import Modal from 'shared/ui/modal';
import { AvatarCrop } from 'entities/user/avatar-crop';

const cx = cnBind.bind(styles);

export const validationRulesProfile = Yup.object().shape({
  email: Yup.string().email('Введите корректный адрес электронной почты'),
  username: Yup.string()
    .min(4, 'минимальное колисчество симвлов для имени - 4 ')
    .max(20, 'Привышено максимальное значение для имени. Максимум - 50 символов')
    .matches(/^\S*$/, 'Имя не должно содержать пробелы')
    .matches(validName, 'Разрешены только латинские буквы, цифры, "-" и "_"'),
  bio: Yup.string().max(70, 'Максимум 70 символов'),
});

export interface IProfileData {
  username: string;
  email: string;
  bio: string;
}

const initialValues: IProfileData = {
  username: '',
  email: '',
  bio: '',
};

export const User = () => {
  const dispatch = useAppDispatch();
  const { isOpen: modalIsOpen, handleOpenModal, handleCloseModal } = useHandleActiveModal();
  const { previews, handleFileSelect, clearSelectedFiles } =
    useSelectedUploadFiles(handleOpenModal);
  const { isLoading } = useAppSelector(state => state.userSlice);
  const { avatar, account_id: accountId } = useAppSelector(state => state.userSlice.user);

  const backButtonClickHandler = () => {
    dispatch(setIsEditProfileActive(false));
  };

  const formik = useFormik({
    initialValues,

    onSubmit: profileData => {
      console.log(JSON.stringify(profileData, null, 2));
      dispatch(updateUserProfileAsync({ accountId, profileData }));
      formik.resetForm();
    },

    validationSchema: validationRulesProfile,
  });



  return (
    <>
      <div className={cx('user')}>
        <Header className={cx('user__header')}>
          <IconButton
            className={cx('user__button', 'user__button--back')}
            typeIcon={'arrow-left'}
            onClick={backButtonClickHandler}
          />
          <span className={cx('user__header-title')}>{'Редактировать профиль'}</span>
          <div className={cx('user__button', 'user__button--fake')} />
        </Header>
        <Content className={cx('user__content')}>
          <div className={cx('user__change-userpic')}>
            <div className={cx('user__avatar-wrapper')}>
              <label className={cx('user__label')} htmlFor="upload">
                <Input
                  className={cx('input')}
                  type="file"
                  id="upload"
                  onChange={handleFileSelect}
                />
                <Avatar avatarImg={avatar} />
                <div className={cx('user__icon-badge')}>
                  <Icon typeIcon={'camera'} />
                </div>
              </label>
            </div>

            <span className={cx('user__avatar-title')}>{'Обновить фотографию'}</span>
          </div>

          <form className={cx('form')} onSubmit={formik.handleSubmit} noValidate={true} >
            <div className={cx('form-field', 'field')}>
              <Input
                className={cx('field__input')}
                id="email"
                type="email"
                name="email"
                placeholder="Email email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={cx('field--error')}>{formik.errors.email}</div>
              )}
            </div>

            <div className={cx('user__form-field', 'field')}>
              <Input
                className={cx('field__input')}
                id="username"
                type="username"
                name="username"
                placeholder="Username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username && (
                <div className={cx('field--error')}>{formik.errors.username}</div>
              )}
            </div>

            <div className={cx('user__form-field', 'field')}>
              <Input
                className={cx('field__input')}
                id="bio"
                type="bio"
                name="bio"
                placeholder="Bio"
                onChange={formik.handleChange}
                value={formik.values.bio}
              />
              {formik.touched.bio && formik.errors.bio && (
                <div className={cx('field--error')}>{formik.errors.bio}</div>
              )}
            </div>

            <div className={cx('form__submit', 'submit')}>
              <IconButton
                type={'submit'}
                className={cx('submit__button')}
                classNameIcon={cx('submit__icon')}
                typeIcon={isLoading ? 'preloader' : undefined}
                disabled={isLoading}
              >
                {isLoading ? '' : 'Сохранить'}
              </IconButton>
            </div>
          </form>
        </Content>
      </div>
      <Portal>
        <Modal
          className={cx('cropp-modal')}
          classNameContent={cx('modal-content')}
          isOpen={modalIsOpen}
        >
          <AvatarCrop
            avatarImg={previews.join('')}
            handleCloseModal={handleCloseModal}
            clearSelectedFiles={clearSelectedFiles}
          />
        </Modal>
      </Portal>
    </>
  );
};
