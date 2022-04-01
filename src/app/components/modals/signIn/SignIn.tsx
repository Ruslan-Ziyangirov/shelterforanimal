import {FC} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../../../utils/use-stores-hook";
import {Modal} from "../modal";
import {Field, Form, Formik} from "formik";
import {Button} from "../../ui/buttons/large/Button";
import {signInScheme} from "../../../schemas/SchemForValidate";
import "./SignIn.sass";
import {ButtonMedium} from "../../ui/buttons/medium/ButtonMedium";
import {Registration} from "../registration/Registration";

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



    return (
        <Modal onClose={clearCurrentModal}>

            <Formik initialValues={{
                phone: "",
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

                                <Field  name="phone" placeholder="Телефон" />

                                {errors.phone && touched.phone ? (
                                    <p className="error">{errors.phone}</p>
                                ) : null}

                                <Field    name="password" placeholder="Пароль"  />

                                {errors.password && touched.password ? (
                                    <p className="error">{errors.password}</p>
                                ) : null}

                            </Form>

                            <ButtonMedium
                                title={"Войти"}
                                color={"white"}
                                background={"#713EDD"}
                                type={"submit"}
                            />
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