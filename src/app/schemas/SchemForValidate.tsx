import * as Yup from "yup";

export const signInScheme = Yup.object().shape({
    phone: Yup.string()
        .required("Пожалуйста,введите номер телефона")
        .matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g,
            "Неверный формат номера"),
    password: Yup.string()
        .required("Пожалуйста,введите пароль")
        .matches(/((?=.*d)(?=.*[a-z])(?=.*[A-Z]).)/g,
            "Пароль должен содержать заглавные и строчные латинские буквы, а также цифру")
        .min(5, "Минимальная длинна пароля - 5 символов"),
    code: Yup.string()
        .required("Пожалуйста, введите код")
        .min(4, "Минимальная длинна кода - 4 символа "),
    email: Yup.string()
        .required("Пожалуйста,введите почту")
        .email("Введите действительную почту"),
    name: Yup.string()
        .required("Пожалуйста,введите наименование организации")
});