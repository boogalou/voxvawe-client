import React from 'react';
import styles from './auth.module.scss'
import cnBind from "classnames/bind";
import {Icon, Input, useAppDispatch} from "../../shared";
import {Link} from "react-router-dom";
import {useShowPasswordToggle} from "./lib/useShowPassword";
import {registrationRequest} from "./model";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {routes} from "@/pages/router/routes";
import { IAuthRequestData } from "@/shared/types/auth.interface";

const cx = cnBind.bind(styles);

export interface formData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: formData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const Signup = () => {

  const [showPassword, togglePassword] = useShowPasswordToggle(false);
  const [showConfirmPassword, toggleConfirmPassword] = useShowPasswordToggle(false);
  const dispatch = useAppDispatch();


  return (
      <Formik
          initialValues = { initialValues }
          // validationSchema={''}
          onSubmit={(values): void => {
            const authData: IAuthRequestData = {
              user: {
                username: values.username,
                email: values.email,
                password: values.password
              }
            }
            console.log(JSON.stringify(authData, null, 2));
            if (authData.user.password === values.confirmPassword) {
              dispatch(registrationRequest(authData));
            } else {
              console.log('Пароли несовадают');
            }
          }}
      >
        {({isSubmitting, values}) => (
            <div className={cx('container')}>
              <span className={cx('container__title')}>Регистрация</span>
              <Form className={cx('form')}>

                <div className={cx('form__field', 'field')}>
                  <label htmlFor="username"></label>
                  <Field
                      id='username'
                      type='text'
                      name='username'
                      value={values.username}
                      placeholder='Enter your email'
                      className={cx('field__input')}
                  />
                  <Icon typeIcon={'user'} className={cx('field__icon', 'field__icon--user')}/>
                  <ErrorMessage name='username'/>
                </div>

                <div className={cx('form__field', 'field')}>
                  <label htmlFor="email"></label>
                  <Field
                      id='email'
                      type='email'
                      name='email'
                      value={values.email}
                      placeholder='Enter your email'
                      className={cx('field__input')}
                  />
                  <Icon typeIcon={'envelope'} className={cx('field__icon', 'field__icon--envelope')}/>
                  <ErrorMessage name='email'/>
                </div>

                <div className={cx('form__field', 'field')}>
                  <label htmlFor='password'></label>
                  <Field
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      value={values.password}
                      placeholder='Enter your password'
                      className={cx('field__input')}
                  />
                  <Icon
                      typeIcon={'lock'}
                      className={cx('field__icon', 'field__icon--lock')}/>
                  <Icon
                      typeIcon={showPassword ? 'eye-off' : 'eye-on'}
                      className={cx('field__icon', 'field__icon--eye')}
                      onClick={togglePassword}
                  />
                  <ErrorMessage name='password'/>
                </div>

                <div className={cx('form__field', 'field')}>
                  <label htmlFor="confirmPassword"></label>
                  <Field
                      id='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      name='confirmPassword'
                      value={values.confirmPassword}
                      placeholder='Confirm password'
                      className={cx('field__input')}
                  />
                  <Icon typeIcon={'lock'} className={cx('field__icon', 'field__icon--lock')}/>
                  <Icon
                      typeIcon={showConfirmPassword ? 'eye-off' : 'eye-on'}
                      className={cx('field__icon', 'field__icon--eye')}
                      onClick={toggleConfirmPassword}
                  />
                  <ErrorMessage name='confirmPassword'/>
                </div>

                <label className={cx("form__footer")}>
                  <div className={cx('form__checkbox', 'checkbox')}>
                    <div className={cx("checkbox__input")}>
                      <Input type={'checkbox'}
                      />
                    </div>
                    <span className={cx("checkbox__text")}>Принять условия</span>
                  </div>

                  <div className={cx('form__submit', 'submit')}>
                    <input
                        className={cx('submit__btn')}
                        type="submit"
                        value='Зарегистрировать'
                    />
                  </div>
                </label>
              </Form>
              <div className={cx("form__link, link")}>
                          <span className={cx('link__text')}>Есть аккаунт?
                              <Link to={routes.SIGNIN_PAGE} className="link__link">Войти</Link>
                          </span>
              </div>
            </div>
        )}

      </Formik>
  )
};
