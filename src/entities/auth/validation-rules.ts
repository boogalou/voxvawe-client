import * as Yup from "yup";


// export const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
export const validPassword = /^[a-zA-Z\d!@#$%^&*]+$/;
export const validName = /^[a-zA-Z0-9_-]+$/;


export const validationRulesRegistrationForm  = Yup.object().shape({
  username: Yup.string()
    .required('Имя обязательно для заполнения')
    .min(4, 'минимальное колисчество симвлов для имени - 4 ')
    .max(20, 'Привышено максимальное значение для имени. Максимум - 50 символов')
    .matches(/^\S*$/, 'Имя не должно содержать пробелы')
    .matches(validName, 'Разрешены только латинские буквы, цифры, "-" и "_"'),
  email: Yup.string()
    .required('Email обязателен для заполнения')
    .email('Введите корректный адрес электронной почты'),
  password: Yup.string()
    .required('Пароль обязателен для заполнения')
    .min(6, 'Пароль должен быть не менее 6 символов')
    .max(30, 'Пароль должен быть не более 30 символов')
    .matches(validPassword, 'Недопустимые спецсиволы в пароле'),
  confirmPassword: Yup.string()
    .required('Подтвердите пароль')
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
});

export const validationRulesLoginForm = Yup.object().shape({
  email: Yup.string()
    .required('Email обязателен для заполнения')
    .email('Введите корректный адрес электронной почты'),
  password: Yup.string().required('Пароль обязателен для заполнения'),
});