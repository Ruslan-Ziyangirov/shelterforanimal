import React, {FC, useRef, useState} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../../../utils/use-stores-hook";
import {Modal} from "../modal";
import {Field, Form, Formik, FormikValues} from "formik";
import "./SignIn.sass";
import 'react-toastify/dist/ReactToastify.css';
import {ButtonMedium} from "../../ui/buttons/medium/ButtonMedium";
import {Registration} from "../registration/Registration";
import {signIn, useAuth} from "../../../config/firebase";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {ToastContainer,toast} from "react-toastify";

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



export const SignIn = observer( () =>{
    const { modalStore: {clearCurrentModal, setCurrentModal} } = useStores();

    const onRegistration = () => {
        clearCurrentModal();
        setCurrentModal(Registration);
    }

    const [loading, setLoading] = useState(false)

    const user = useAuth()
    let router = useNavigate()



    async function handleSignIn(values:FormikValues){
        setLoading(true)
        try {
            await signIn(values.email, values.password);
            router('/profile')
            clearCurrentModal()
            toast('Вход прошел успешно!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                type: 'success',
                draggable: true,
                progress: undefined,
            })
        } catch {
            toast('Такого пользователя не существует!', {
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

    const signInSchema = Yup.object().shape({
        email: Yup.string()
            .required("Пожалуйста,введите почту")
            .email("Введите действительную почту"),
        password: Yup.string()
            .required("Пожалуйста,введите пароль")
            .matches(/^(?=.*[0-9])(?=.*[a-z]).{3,10}$/g,
                "Пароль должен содержать строчные латинские  буквы, а также цифру")
            .min(5, "Минимальная длинна пароля - 5 символа"),
    });


    return (
        <Modal onClose={clearCurrentModal}>

            <Formik initialValues={{
                email: "",
                password: ""
            }}
                    onSubmit={values => {
                        handleSignIn(values);
                    }}
                    validationSchema={signInSchema}
            >
                {({errors,touched,handleSubmit,values}) =>(
                    <div className="elements-wrapper">
                        <div className="title-btn-wrapper">
                            <h3>Вход</h3>
                            <button className="btn-close" onClick={clearCurrentModal}>
                                <Icon name="close-btn" height="20" width="20"/>
                            </button>
                        </div>
                        <div className="form-wrapper">
                            <form onSubmit={handleSubmit}>
                                <Field  name="email"
                                        placeholder="Email"
                                        />

                                {errors.email && touched.email ? (
                                    <p className="error">{errors.email}</p>
                                ) : null}

                                <Field    name="password"
                                          placeholder="Пароль"
                                          type="password"

                                          />

                                {errors.password && touched.password ? (
                                    <p className="error">{errors.password}</p>
                                ) : null}

                                <ButtonMedium
                                    title={"Войти"}
                                    color={"white"}
                                    background={"#713EDD"}
                                    type={"submit"}
                                    disabled={loading || user}
                                />

                            </form>
                        </div>
                        <div className="link-wrapper">
                            <p>Не зарегистрированы?</p>
                            <button className="btn-as-link" onClick={onRegistration}>
                                Регистрация
                            </button>
                        </div>
                    </div>
                )}
            </Formik>
        </Modal>
    )
});