import {FC, useRef, useState} from "react";
import {observer} from "mobx-react";
import {useStores} from "../../../../utils/use-stores-hook";
import {Registration} from "../registration/Registration";
import {database, signIn, signUp, useAuth} from "../../../config/firebase";
import {useNavigate} from "react-router-dom";
import {Modal} from "../modal";
import {Form, Formik} from "formik";
import {signInScheme} from "../../../schemas/SchemForValidate";
import {ButtonMedium} from "../../ui/buttons/medium/ButtonMedium";
import {addDoc, collection} from "firebase/firestore";

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
    onSuccess?: any;
}



export const WriteHistory:FC<WriteHistoryModal> = observer( ({onSuccess}) =>{
    const { modalStore: {clearCurrentModal, setCurrentModal} } = useStores();

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        title: '',
        date: '',
        count: ''
    })

    const currentUser = useAuth();
    const historyDatabaseRef = collection(database, 'history');

    async function writeHistory(){
        setLoading(true)
        try {
                await addDoc(historyDatabaseRef, {
                    uid: currentUser.uid,
                    title: data.title,
                    date: data.date,
                    count: data.count

                }).then(res => console.log(res));
            clearCurrentModal();
        } catch(e) {
            console.log((e as Error).message)
        }
        setLoading(false)
    }

    return (
        <Modal onClose={clearCurrentModal}>

            <Formik initialValues={{
                title: "",
                date: "",
                count: "",
            }}
                    onSubmit={values => {
                        alert(values);
                    }}
            >
                {({errors,touched}) =>(
                    <div className="elements-wrapper">
                        <div className="title-btn-wrapper">
                            <h3>Запись посещения</h3>
                            <button className="btn-close" onClick={clearCurrentModal}>
                                <Icon name="close-btn" height="20" width="20"/>
                            </button>
                        </div>
                        <div className="form-wrapper">
                            <Form>

                                <input  name="title"
                                        placeholder="Название"
                                        value={data.title}
                                        onChange={(e: any) => setData({...data, title: e.target.value})}
                                        />

                                {errors.title && touched.title ? (
                                    <p className="error">{errors.title}</p>
                                ) : null}

                                <input    name="date"
                                          placeholder="Дата"
                                          value={data.date}
                                          onChange={(e: any) => setData({...data, date: e.target.value})}
                                />

                                {errors.date && touched.date ? (
                                    <p className="error">{errors.date}</p>
                                ) : null}

                                <input    name="count"
                                          placeholder="Сумма пожертвований"
                                          value={data.count}
                                          onChange={(e: any) => setData({...data, count: e.target.value})}
                                />

                                {errors.count && touched.count ? (
                                    <p className="error">{errors.count}</p>
                                ) : null}

                                <ButtonMedium
                                    title={"Добавить запись"}
                                    color={"white"}
                                    background={"#713EDD"}
                                    type={"button"}
                                    onClick={writeHistory}
                                />
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>

        </Modal>
    )
});