import {Stars} from "../../components/stars/Stars";
import {FC, useEffect, useState} from "react";
import "./Shelter.sass"
import {Footer} from "../../components/footer/Footer";
import {collection, getDocs} from "firebase/firestore";
import {database, useAuth} from "../../config/firebase";
import {observer} from "mobx-react";
import {useStores} from "../../../utils/use-stores-hook";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ShelterModel} from "../../model/ShelterModel";
import {WriteHistory} from "../../components/modals/writeHistory/WriteHistory";
import inst from "../../../assets/instagram-icon.png";
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


export const Shelter = observer(() =>{

    const sheltersDatabaseRef = collection(database, 'shelters');
    const {modalStore: { setCurrentModal } } = useStores();
    const [sheltersInfo, setShelterInfo] = useState<any>([]);
    const [shelterInformation, setShelterInformation] = useState<ShelterModel>();
    const [showModal, setShowModal] = useState(false);
    const user = useAuth();
    const {id}: Readonly<any> = useParams();
    let router = useNavigate()

    useEffect(()=>{
        const getSheltersList = async () =>{
            const data = await getDocs(sheltersDatabaseRef);
            let arr = data.docs.map((doc) => ({...doc.data()}))
            setShelterInfo(arr)
        };
        getSheltersList().then();
    },[])


    useEffect(() => {
        const shelter = sheltersInfo.find((shelter:any) => shelter.id === +id);
        setShelterInformation(shelter);
    }, [id, sheltersInfo]);

    const onOpenModal = () =>{
        setShowModal(true);
    }

    const onComeBack = () =>{
        router('/shelters')
    }

    const onUserActive = () =>{
        if(user){
            onOpenModal()
        }else{
            toast('Сначала нужно авторизоваться!', {
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
    }


    return(
        <>{
            shelterInformation &&
            <div className="shelter-body-wrapper">
                <h2>
                    <span>Приюты</span> Казани
                </h2>

                <div className="shelter-information-wrapper">
                    <div className="img-and-back">
                        <button className="btn-back" onClick={onComeBack}>
                            <Icon name={"arrow-back"} height={25} width={25}/>
                        </button>
                        <img src={shelterInformation.image}/>
                    </div>


                    <div className="information-block">
                        <div className="header-and-stars">
                            <h3>
                                {shelterInformation.title}
                            </h3>
                            <Stars ratingShelter={shelterInformation.rating}
                                   shortNameDoc={shelterInformation.shortName}
                                   numberOfVoters={shelterInformation.numberOfVoters}/>
                        </div>
                        <p className="description-shelter">
                            {shelterInformation.description}
                        </p>

                        <div className="additional-information-wrapper">

                            <button className="submit" onClick={onUserActive}>
                                Оставить заявку
                            </button>

                            <div className="additional-information">
                                <div className="place-shelter">
                                    <p>
                                        {shelterInformation.address}
                                    </p>
                                    <Icon name={"map"} height={16} width={20}/>
                                </div>

                                <div className="social-media">
                                    <p>
                                        {shelterInformation.phone}
                                    </p>
                                    <a href={shelterInformation.vk}>
                                        <Icon name={"vk"} height={24} width={24}/>
                                    </a>
                                    <img src={inst} className="inst"/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        }
        <Footer/>
            {showModal ? <WriteHistory nameShelter={shelterInformation?.title} show={() => setShowModal(false)}/> : null}
        </>

    )
})