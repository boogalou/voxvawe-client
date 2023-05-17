import React, { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.scss';
import cnBind from 'classnames/bind';
import { Icon, Input, useAppDispatch, useAppSelector } from '../../shared';
import { loginRequest } from './model';
import { useShowPasswordToggle } from './lib/use-show-password';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { routes } from 'shared/constants';
import { IAuthRequestData } from 'shared/types';

const cx = cnBind.bind(styles);

export const Signin: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isAuth, error } = useAppSelector(state => state.authSlice);
  const [showPassword, togglePassword] = useShowPasswordToggle(false);

  useEffect(() => {
    if (isAuth) {
      navigate(routes.IM_PAGE);
    }
  }, [isAuth]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={''}
      onSubmit={(values): void => {
        const data: IAuthRequestData = {
          user: {
            email: values.email,
            password: values.password,
          },
        };
        console.log(JSON.stringify(data, null, 2));
        dispatch(loginRequest(data));
      }}
    >
      {({ isSubmitting, values }) => (
        <div className={cx('container')}>
          <span className={cx('container__title')}>Войти</span>
          <Form className={cx('form')}>
            <div className={cx('form__field', 'field')}>
              <div className={cx('field__error', { 'field__error--active': error })}>{error}</div>
              <label htmlFor="email"></label>
              <Field
                id="email"
                type="email"
                name="email"
                value={values['email']}
                placeholder="Enter your email"
                className={cx('field__input')}
              />
              <Icon typeIcon={'envelope'} className={cx('field__icon', 'field__icon--envelope')} />
              <ErrorMessage name="email">{error => error}</ErrorMessage>
            </div>

            <div className={cx('form__field', 'field')}>
              <div className={cx('field__error', { 'field__error--active': error })}>{error}</div>
              <label htmlFor="password"></label>
              <Field
                id="password"
                type={!showPassword ? 'password' : 'text'}
                name="password"
                value={values['password']}
                placeholder="Enter your password"
                className={cx('field__input')}
              />
              <Icon typeIcon={'lock'} className={cx('field__icon', 'field__icon--lock')} />
              <div onClick={togglePassword}>
                <Icon
                  typeIcon={showPassword ? 'eye-off' : 'eye-on'}
                  className={cx('field__icon', 'field__icon--eye')}
                />
              </div>
              <ErrorMessage name="password">{error => error}</ErrorMessage>
            </div>

            <label className={cx('form__footer')}>
              <div className={cx('form__checkbox', 'checkbox')}>
                <div className={cx('checkbox__input')}>
                  <Input type={'checkbox'} />
                </div>
                <span className={cx('checkbox__text')}>Запомнить?</span>
              </div>

              <div className={cx('form__submit', 'submit')}>
                <input
                  className={cx('submit__btn')}
                  type="submit"
                  value="Войти"
                  disabled={isLoading}
                />
              </div>
            </label>
          </Form>
          <div className={cx('form__link, link')}>
            <span className={cx('link__text')}>
              Не зарегистрирован(а)?
              <Link to={routes.SIGNUP_PAGE} className="link__link">
                Регистрация
              </Link>
            </span>
          </div>
        </div>
      )}
    </Formik>
  );
};
