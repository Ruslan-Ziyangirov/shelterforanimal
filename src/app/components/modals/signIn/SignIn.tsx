import {FC, useRef, useState} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../../../utils/use-stores-hook";
import {Modal} from "../modal";
import {Field, Form, Formik} from "formik";
import {Button} from "../../ui/buttons/large/Button";
import {signInScheme} from "../../../schemas/SchemForValidate";
import "./SignIn.sass";
import {ButtonMedium} from "../../ui/buttons/medium/ButtonMedium";
import {Registration} from "../registration/Registration";
import {signIn, useAuth} from "../../../config/firebase";
import {useNavigate} from "react-router-dom";

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


    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;


    async function handleSignIn(){
        setLoading(true)
        try {
            await signIn(emailRef.current.value, passwordRef.current.value);
            router('/profile')
            clearCurrentModal()
        } catch {
            alert("Error!")
        }
        setLoading(false)
    }



    return (
        <Modal onClose={clearCurrentModal}>

            <Formik initialValues={{
                email: "",
                password: ""
            }}
                    validationSchema={signInScheme}
                    onSubmit={values => {
                        alert(values);
                    }}
            >
                {({errors,touched}) =>(
                    <div className="elements-wrapper">
                        <div className="title-btn-wrapper">
                            <h3>Вход</h3>
                            <button className="btn-close" onClick={clearCurrentModal}>
                                <Icon name="close-btn" height="20" width="20"/>
                            </button>
                        </div>
                        <div className="form-wrapper">
                            <Form>

                                <input  name="email"
                                        placeholder="Email"
                                        ref={emailRef}/>

                                {errors.email && touched.email ? (
                                    <p className="error">{errors.email}</p>
                                ) : null}

                                <input    name="password"
                                          placeholder="Пароль"
                                          ref={passwordRef}/>

                                {errors.password && touched.password ? (
                                    <p className="error">{errors.password}</p>
                                ) : null}



                                <ButtonMedium
                                    title={"Войти"}
                                    color={"white"}
                                    background={"#713EDD"}
                                    type={"button"}
                                    disabled={loading || user}
                                    onClick={handleSignIn}
                                />

                            </Form>
                        </div>
                        <div className="link-wrapper">
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