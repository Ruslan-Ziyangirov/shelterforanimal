import React, {FC, useRef, useState} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../../../utils/use-stores-hook";
import {Field, Form, Formik, FormikValues} from "formik";
import {Button} from "../../ui/buttons/large/Button";
import {Modal} from "../modal";
import {SignIn} from "../signIn/SignIn";
import {ButtonMedium} from "../../ui/buttons/medium/ButtonMedium";
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from "react-dom";
import {Router, useNavigate} from "react-router-dom";
import {signUp, useAuth} from "../../../config/firebase";
import * as Yup from "yup";
import {toast} from "react-toastify";


interface Props{
    name:string,
    height: number|string;
    width:number|string;
}


export const Icon: FC<Props> = ({ name, height,width}) => {
    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            <use xlinkHref={`/sprite.svg#${name}`}></use>
        </svg>
    );
}



export const Registration = observer( () =>{

    const [loading, setLoading] = useState(false)


    const user = useAuth();
    const { modalStore: {clearCurrentModal, setCurrentModal} } = useStores();


    async function handleSignUp(values: FormikValues){
        setLoading(true)
        try {
            await signUp(values.email, values.password, values)
            toast('Регистрация прошла успешно!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                type: 'success',
                draggable: true,
                progress: undefined,
            })
            clearCurrentModal()
        } catch(e) {
            console.log((e as Error).message)
            toast('Вы не смогли зарегистрироваться!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                type: 'error',
                draggable: true,
                progress: undefined,
            })
        }
        setLoading(false)
    }

    const schema = Yup.object().shape({
        password: Yup.string()
            .required("Пожалуйста,введите пароль")
            .matches(/^(?=.*[0-9])(?=.*[a-z]).{3,10}$/g,
                "Пароль должен содержать строчные латинские  буквы, а также цифру")
            .min(5, "Минимальная длинна пароля - 5 символа"),
        repassword: Yup.string()
            .required("Пожалуйста,введите пароль")
            .matches(/^(?=.*[0-9])(?=.*[a-z]).{3,10}$/g,
                "Пароль должен содержать строчные латинские  буквы, а также цифру")
            .min(5, "Минимальная длинна пароля - 5 символа"),
        email: Yup.string()
            .required("Пожалуйста,введите почту")
            .email("Введите действительную почту"),
        phone: Yup.string()
            .required("Пожалуйста,введите номер телефона")
            .matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g,
                "Неверный формат номера"),
        name: Yup.string()
            .required("Пожалуйста,введите имя"),
    });


    const onSignIn = () =>{
        clearCurrentModal();
        setCurrentModal(SignIn);
    }

    return (
        <Modal onClose={clearCurrentModal}>

            <Formik initialValues={{
                name: "",
                email: "",
                password: "",
                repassword: "",
                phone:"",

            }}

                    onSubmit={values => {
                        handleSignUp(values);
                    }}
                    validationSchema={schema}
            >
                {({errors,touched,handleSubmit,values}) =>(
                    <div className="elements-wrapper">
                        <div className="title-btn-wrapper">
                            <h3>Регистрация</h3>
                            <button className="btn-close" onClick={clearCurrentModal}>
                                <Icon name="close-btn" height="20" width="20"/>
                            </button>
                        </div>
                        <div className="form-wrapper">
                            <form onSubmit={handleSubmit}>

                                <Field name="name"
                                       placeholder="Имя"
                                       />
                                {errors.name && touched.name ? (
                                    <p className="error">{errors.name}</p>
                                ) : null}

                                <Field   name="email"
                                         placeholder="Email"
                                         />
                                {errors.email && touched.email ? (
                                    <p className="error">{errors.email}</p>
                                ) : null}

                                <Field    name="password"
                                          placeholder="Пароль"
                                          />
                                {errors.password && touched.password ? (
                                    <p className="error">{errors.password}</p>
                                ) : null}

                                <Field    name="repassword"
                                          placeholder="Повторите пароль"
                                />
                                {errors.repassword && touched.repassword ? (
                                    <p className="error">{errors.repassword}</p>
                                ) : null}

                                <Field    name="phone"
                                          placeholder="Телефон"
                                />
                                {errors.phone && touched.phone ? (
                                    <p className="error">{errors.phone}</p>
                                ) : null}
                            </form>

                            <ButtonMedium
                                title={"Зарегистрироваться"}
                                color={"white"}
                                background={"#713EDD"}
                                type={"submit"}
                                disabled={loading || user}
                                onClick={handleSubmit}
                            />

                        </div>
                        <div className="link-wrapper">
                            <button className="btn-as-link" onClick={onSignIn}>
                                Я уже зарегистрировался(-ась)
                            </button>
                        </div>
                    </div>
                )}
            </Formik>

        </Modal>
    )
});