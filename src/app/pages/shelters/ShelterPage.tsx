

import {Footer} from "../../components/footer/Footer";
import "./ShelterPage.sass"
import {ShelterCard} from "../../components/cards/shelterCard/ShelterCard";
import specHouse from "../../../assets/spec house.png";
import dogShelter from "../../../assets/dog shelter.png"
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {database, useAuth} from "../../config/firebase";
import {VisitCard} from "../../components/cards/visitCard/VisitCard";
import {Link} from "react-router-dom";
import {useStores} from "../../../utils/use-stores-hook";
import {getSheltersInfo} from "../../../utils/collectionData";

export const ShelterPage = () =>{

    const currentUser = useAuth();

    const {shelterStore: {sheltersMock}} = useStores();
    const [sheltersInfo, setShelterInfo] = useState<any>([]);
    const sheltersDatabaseRef = collection(database, 'shelters');

    useEffect(()=>{
        const getSheltersList = async () =>{
            const data = await getDocs(sheltersDatabaseRef);
            let arr = data.docs.map((doc) => ({...doc.data()}))
            setShelterInfo(arr)
            console.log(arr)
        };
            getSheltersList().then();
    },[])


    return(
        <div className="shelter-page-body">
            <div className="shelters-wrapper">
                <h2>
                    <span>Приюты</span> Казани
                </h2>
                <img className="dog-shelter" src={dogShelter}/>

                <div className="shelter-list">
                    {sheltersInfo.map((shelter:any) =>(
                        <Link className="btn-shelter" to={`/shelters/${shelter.id}`}>
                            <ShelterCard title={shelter.title}
                                         description={shelter.description}
                                         address={shelter.address}
                                         image={shelter.image}/>
                        </Link>
                        )
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    )
}