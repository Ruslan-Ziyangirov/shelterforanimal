import {FC, useRef, useState} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../../../utils/use-stores-hook";
import {database, signIn, signUp, useAuth} from "../../../config/firebase";
import {Modal} from "../modal";
import {Field, Form, Formik, FormikValues} from "formik";
import {ButtonMedium} from "../../ui/buttons/medium/ButtonMedium";
import {addDoc, collection} from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import "./WriteHistory.sass"
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

interface WriteHistoryModal{
    show?: any;
    nameShelter?: any;
}



export const WriteHistory:FC<WriteHistoryModal> = observer( ({nameShelter, show}) =>{
    const { modalStore: {clearCurrentModal, setCurrentModal} } = useStores();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        title: nameShelter,
        date: '',
        time: ''
    })

    const onCloseModal = () => {
        show();
    }
    const currentUser = useAuth();
    const historyDatabaseRef = collection(database, 'history');

    async function writeHistory(values:FormikValues){
        setLoading(true)
        try {
                await addDoc(historyDatabaseRef, {
                    uid: currentUser.uid,
                    title: data.title,
                    date: values.date,
                    time: values.time

                }).then(res => console.log(res));
            onCloseModal();
            toast('Вы успешно оставили заявку!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                type: 'success',
                draggable: true,
                progress: undefined,
            })
        } catch(e) {
            console.log((e as Error).message)
            toast('Записаться не получилось!', {
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

    const schemaHistory = Yup.object().shape({
        date: Yup.string()
            .required("Пожалуйста,введите дату")
            .matches(/^(0?[1-9]|[12][0-9]|3[01])[\.\-](0?[1-9]|1[012])[\.\-]\d{4}$/g,
                "Неправильно ввели дату")
            .min(5, "Минимальная длинна пароля - 5 символа"),
        time: Yup.string()
            .required("Пожалуйста,введите время")
            .matches(/^[0-2][0-9]:[0-5][0-9]$/g,
                "Неправильно ввели время")
            .min(5, "Минимальная длинна пароля - 5 символа"),

    });

    return (
        <>
             <Modal onClose={clearCurrentModal}>

                <Formik initialValues={{
                    date: "",
                    time: "",
                }}
                        onSubmit={values => {
                            writeHistory(values);
                        }}
                        validationSchema={schemaHistory}
                >
                    {({errors,touched,handleSubmit,values}) =>(
                        <div className="elements-wrapper">
                            <div className="title-btn-wrapper">
                                <h3>Запись посещения</h3>
                                <button className="btn-close" onClick={onCloseModal}>
                                    <Icon name="close-btn" height="20" width="20"/>
                                </button>
                            </div>
                            <div className="form-wrapper">
                                <form onSubmit={handleSubmit}>
                                    <h4 className="subtitle">
                                        Дата
                                    </h4>
                                    <Field    name="date"
                                              placeholder="Например '12.12.2021'"
                                    />

                                    {errors.date && touched.date ? (
                                        <p className="error">{errors.date}</p>
                                    ) : null}
                                    <h4 className="subtitle">
                                        Время
                                    </h4>
                                    <Field    name="time"
                                              placeholder="Например '19:30' "
                                    />

                                    {errors.time && touched.time ? (
                                        <p className="error">{errors.time}</p>
                                    ) : null}
                                    <ButtonMedium
                                        title={"Оставить заявку"}
                                        color={"white"}
                                        background={"#713EDD"}
                                        type={"submit"}
                                    />
                                </form>
                            </div>
                        </div>
                    )}
                </Formik>

            </Modal>
        </>


    )
});