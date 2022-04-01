import {FC} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../../../utils/use-stores-hook";
import {Field, Form, Formik} from "formik";
import {signInScheme} from "../../../schemas/SchemForValidate";
import {Button} from "../../ui/buttons/large/Button";
import {Modal} from "../modal";
import {SignIn} from "../signIn/SignIn";
import {ButtonMedium} from "../../ui/buttons/medium/ButtonMedium";

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
    const { modalStore: {clearCurrentModal, setCurrentModal} } = useStores();

    const onSignIn = () =>{
        clearCurrentModal();
        setCurrentModal(SignIn);
    }




    return (
        <Modal onClose={clearCurrentModal}>

            <Formik initialValues={{
                partners: "",
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

                                <Field name="partners" placeholder="Имя"/>
                                {errors.partners && touched.partners ? (
                                    <p className="error">{errors.partners}</p>
                                ) : null}

                                <Field   name="email" placeholder="Email" />

                                {errors.email && touched.email ? (
                                    <p className="error">{errors.email}</p>
                                ) : null}

                                <Field    name="password" placeholder="Пароль"  />

                                {errors.password && touched.password ? (
                                    <p className="error">{errors.password}</p>
                                ) : null}

                            </Form>

                            <ButtonMedium
                                title={"Зарегистрироваться"}
                                color={"white"}
                                background={"#713EDD"}
                                type={"submit"}
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