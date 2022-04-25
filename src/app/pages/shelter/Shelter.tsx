import {Stars} from "../../components/stars/Stars";
import {FC, useContext, useEffect, useState} from "react";
import "./Shelter.sass"
import shelterImg from "../../../assets/spec house.png";
import {Footer} from "../../components/footer/Footer";
import {collection, getDocs} from "firebase/firestore";
import {database} from "../../config/firebase";
import {MobXProviderContext, observer} from "mobx-react";
import {useStores} from "../../../utils/use-stores-hook";
import {useParams} from "react-router-dom";
import {MainStore} from "../../stores/mainStore";
import {ShelterModel} from "../../model/ShelterModel";

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


    const {shelterStore: {sheltersMock}} = useStores();
    const [shelterInformation, setShelterInformation] = useState<ShelterModel>();
    const {id}: Readonly<any> = useParams();

    useEffect(() => {
        const shelter = sheltersMock.find((shelter:any) => shelter.id === +id);

        setShelterInformation(shelter);
    }, [id, sheltersMock]);


    return(
        <>{
            shelterInformation &&
            <div className="shelter-body-wrapper">
                <h2>
                    <span>Приюты</span> Казани
                </h2>

                <div className="shelter-information-wrapper">
                    <img src={shelterInformation.image}/>

                    <div className="information-block">
                        <div className="header-and-stars">
                            <h3>
                                {shelterInformation.title}
                            </h3>
                            <Stars/>
                        </div>
                        <p className="description-shelter">
                            {shelterInformation.description}
                        </p>
                        <div>

                            <div className="additional-information">
                                <div className="place-shelter">
                                    <Icon name={"map"} height={16} width={20}/>
                                    <p>
                                        {shelterInformation.address}
                                    </p>
                                </div>

                                <div>
                                    <p>
                                        {shelterInformation.phone}
                                    </p>
                                </div>

                                <div>
                                    <Icon name={"vk"} height={24} width={24}/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        }
        <Footer/>
        </>

    )
})