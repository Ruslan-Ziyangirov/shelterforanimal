import {FC, useRef, useState} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../../../utils/use-stores-hook";
import {Field, Form, Formik} from "formik";
import {signInScheme} from "../../../schemas/SchemForValidate";
import {Button} from "../../ui/buttons/large/Button";
import {Modal} from "../modal";
import {SignIn} from "../signIn/SignIn";
import {ButtonMedium} from "../../ui/buttons/medium/ButtonMedium";
import ReactDOM from "react-dom";
import {Router, useNavigate} from "react-router-dom";
import {signUp, useAuth} from "../../../config/firebase";


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
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    })


    const user = useAuth();


    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const { modalStore: {clearCurrentModal, setCurrentModal} } = useStores();


    async function handleSignUp(){
        setLoading(true)
        try {
            await signUp(emailRef.current.value, passwordRef.current.value, data)
            console.log(data)
        } catch(e) {
            console.log((e as Error).message)
        }
        setLoading(false)
    }



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
                phone:"",

            }}

                    onSubmit={values => {
                        alert(values);
                    }}
            >
                {({errors,touched}) =>(
                    <div className="elements-wrapper">
                        <div className="title-btn-wrapper">
                            <h3>Регистрация</h3>
                            <button className="btn-close" onClick={clearCurrentModal}>
                                <Icon name="close-btn" height="20" width="20"/>
                            </button>
                        </div>
                        <div className="form-wrapper">
                            <Form>

                                <input name="name"
                                       placeholder="Имя"
                                       value={data.name}
                                       onChange={(e: any) => setData({...data, name: e.target.value})}

                                       />


                                <input   name="email"
                                         placeholder="Email"
                                         ref={emailRef}
                                         value={data.email}
                                         onChange={(e: any) => setData({...data, email: e.target.value})}

                                         />

                                <input    name="password"
                                          placeholder="Пароль"
                                          ref={passwordRef}
                                          value={data.password}
                                          onChange={(e: any) => setData({...data, password: e.target.value})}

                                          />

                                <input    name="phone"
                                          placeholder="Телефон"
                                          value={data.phone}
                                          onChange={(e: any) => setData({...data, phone: e.target.value})}


                                />


                            </Form>

                            <ButtonMedium
                                title={"Зарегистрироваться"}
                                color={"white"}
                                disabled={loading || user}
                                background={"#713EDD"}
                                type={"button"}
                                onClick={handleSignUp}
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