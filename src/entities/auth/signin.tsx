import React, { FC, FormEvent, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import cnBind from 'classnames/bind';
import styles from './auth.module.scss';
import { Icon, IconButton, Input, useAppDispatch, useAppSelector } from "../../shared";
import { loginRequestAsync } from './model';
import { useShowPasswordToggle } from './lib/use-show-password';
import { routes } from 'shared/constants';
import { useFormik } from 'formik';
import { validationRulesLoginForm } from "entities/auth/validation-rules";

const cx = cnBind.bind(styles);

export interface LoginFormData {
  email: string;
  password: string;
}

const initialValues: LoginFormData = {
  email: '',
  password: '',
};



export const Signin: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isAuth, error } = useAppSelector(state => state.authSlice);
  const [showPassword, togglePassword] = useShowPasswordToggle(false);

  const formik = useFormik({
    initialValues,

    onSubmit: loginData => {
      console.log(JSON.stringify(loginData, null, 2));
      dispatch(
        loginRequestAsync({
          user: {
            ...loginData,
          },
        })
      );
    },

    validationSchema: validationRulesLoginForm,
  });

  useEffect(() => {
    if (isAuth) {
      navigate(routes.IM_PAGE);
    }

    if (error && error.timeError) {
      toast.error(error.messageError);
    }
  }, [isAuth, error]);


  const submitHandler = (evt: React.MouseEvent) => {
    evt.preventDefault();
    console.log('submitHandler: ', 'click!');
    formik.handleSubmit();
  }

  return (
    <>
      <div className={cx('container')}>
        <span className={cx('container__title')}>Войти</span>
        <form className={cx('form')} noValidate={true}>
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
              className={cx('field__input')}
              id="password"
              type={!showPassword ? 'password' : 'text'}
              name="password"
              onChange={formik.handleChange}
              placeholder="Enter your password"
            />
            <Icon typeIcon={'lock'} className={cx('field__icon', 'field__icon--lock')} />
            <div onClick={togglePassword}>
              <Icon
                typeIcon={showPassword ? 'eye-off' : 'eye-on'}
                className={cx('field__icon', 'field__icon--eye')}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className={cx('field--error')}>{formik.errors.password}</div>
            )}
          </div>

          <label className={cx('form__footer')}>
            <div className={cx('form__checkbox', 'checkbox')}>
              <div className={cx('checkbox__input')}>
                <Input type={'checkbox'} />
              </div>
              <span className={cx('checkbox__text')}>Запомнить?</span>
            </div>

            <div className={cx('form__submit', 'submit')}>
              <IconButton
                className={cx('submit__button')}
                classNameIcon={cx('submit__icon')}
                typeIcon={isLoading ? 'preloader' : undefined}
                onClick={submitHandler}
                disabled={isLoading}
              >
                {isLoading ? '' : 'Войти'}
                </IconButton>
            </div>
          </label>
        </form>
        <div className={cx('form__link, link')}>
          <span className={cx('link__text')}>
            Не зарегистрирован(а)?
            <Link to={routes.SIGNUP_PAGE} className="link__link">
              Регистрация
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};
