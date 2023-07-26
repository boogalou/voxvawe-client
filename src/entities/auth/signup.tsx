import React from 'react';
import styles from './auth.module.scss';
import cnBind from 'classnames/bind';
import { Icon, IconButton, Input, useAppDispatch, useAppSelector } from '../../shared';
import { Link } from 'react-router-dom';
import { useShowPasswordToggle } from './lib/use-show-password';
import { registrationRequestAsync } from './model';
import { useFormik } from 'formik';
import { routes } from 'shared/constants';
import { validationRulesRegistrationForm } from 'entities/auth/validation-rules';

const cx = cnBind.bind(styles);

export interface RegistrationFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: RegistrationFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const Signup = () => {
  const { isLoading, error, isAuth } = useAppSelector(state => state.authSlice);
  const [showPassword, togglePassword] = useShowPasswordToggle(false);
  const [showConfirmPassword, toggleConfirmPassword] = useShowPasswordToggle(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,

    onSubmit: registrationData => {
      console.log(JSON.stringify(registrationData, null, 2));
      dispatch(
        registrationRequestAsync({
          user: {
            username: registrationData.username,
            email: registrationData.email,
            password: registrationData.password,
          },
        })
      );
    },
    validationSchema: validationRulesRegistrationForm,
  });

  const submitHandler = (evt: React.MouseEvent) => {
    evt.preventDefault();
    console.log('submitHandler: ', 'click!');
    formik.handleSubmit();
  };

  return (
    <div className={cx('container')}>
      <span className={cx('container__title')}>Регистрация</span>
      <form className={cx('form')} onSubmit={formik.handleSubmit} noValidate={true}>
        <div className={cx('form__field', 'field')}>
          <Input
            className={cx('field__input')}
            id="username"
            type="text"
            name="username"
            onChange={formik.handleChange}
            placeholder="Enter your username"
          />
          <Icon typeIcon={'user'} className={cx('field__icon', 'field__icon--user')} />
          {formik.touched.username && formik.errors.username && (
            <div className={cx('field--error')}>{formik.errors.username}</div>
          )}
        </div>

        <div className={cx('form__field', 'field')}>
          <Input
            className={cx('field__input')}
            id="email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            placeholder="Enter your email"
          />
          <Icon typeIcon={'envelope'} className={cx('field__icon', 'field__icon--envelope')} />
          {formik.touched.email && formik.errors.email && (
            <div className={cx('field--error')}>{formik.errors.email}</div>
          )}
        </div>

        <div className={cx('form__field', 'field')}>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={formik.handleChange}
            placeholder="Enter your password"
            className={cx('field__input')}
          />
          <Icon typeIcon={'lock'} className={cx('field__icon', 'field__icon--lock')} />
          <Icon
            typeIcon={showPassword ? 'eye-off' : 'eye-on'}
            className={cx('field__icon', 'field__icon--eye')}
            onClick={togglePassword}
          />
          {formik.touched.password && formik.errors.password && (
            <div className={cx('field--error')}>{formik.errors.password}</div>
          )}
        </div>

        <div className={cx('form__field', 'field')}>
          <Input
            className={cx('field__input')}
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            onChange={formik.handleChange}
            placeholder="Confirm password"
          />
          <Icon typeIcon={'lock'} className={cx('field__icon', 'field__icon--lock')} />
          <Icon
            typeIcon={showConfirmPassword ? 'eye-off' : 'eye-on'}
            className={cx('field__icon', 'field__icon--eye')}
            onClick={toggleConfirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className={cx('field--error')}>{formik.errors.confirmPassword}</div>
          )}
        </div>

        <label className={cx('form__footer')}>
          <div className={cx('form__checkbox', 'checkbox')}>
            <div className={cx('checkbox__input')}>
              <Input type="checkbox" />
            </div>
            <span className={cx('checkbox__text')}>Принять условия</span>
          </div>

          <div className={cx('form__submit', 'submit')}>
            <IconButton
              className={cx('submit__button')}
              classNameIcon={cx('submit__icon')}
              typeIcon={isLoading ? 'preloader' : undefined}
              onClick={submitHandler}
              disabled={isLoading}
            >
              {isLoading ? '' : 'Зарегистрировать'}
            </IconButton>
          </div>
        </label>
      </form>
      <div className={cx('form__link, link')}>
        <span className={cx('link__text')}>
          Есть аккаунт?
          <Link to={routes.SIGNIN_PAGE} className="link__link">
            Войти
          </Link>
        </span>
      </div>
    </div>
  );
};
