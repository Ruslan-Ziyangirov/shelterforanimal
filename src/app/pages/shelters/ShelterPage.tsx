

import {Footer} from "../../components/footer/Footer";
import "./ShelterPage.sass"
import {ShelterCard} from "../../components/shelterCard/ShelterCard";
import specHouse from "../../../assets/spec house.png";
import dogShelter from "../../../assets/dog shelter.png"
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {database} from "../../config/firebase";
import {VisitCard} from "../../components/visitCard/VisitCard";

export const ShelterPage = () =>{

    const sheltersDatabaseRef = collection(database, 'shelters');
    const [sheltersInfo, setShelterInfo] = useState<any>([]);


    useEffect( () => {

        const getSheltersInfo = async () => {
            const data = await getDocs(sheltersDatabaseRef);
            let arr = data.docs.map((doc) => ({...doc.data()}));
            console.log(sheltersInfo);
            setShelterInfo(arr);
        };
        getSheltersInfo().then(err => console.log(err))
    })

    return(
        <div className="shelter-page-body">
            <div className="shelters-wrapper">
                <h2>
                    <span>Приюты</span> Казани
                </h2>
                <img className="dog-shelter" src={dogShelter}/>

                <div className="shelter-list">
                    {sheltersInfo.map((shelter:any) =>(
                            <ShelterCard title={shelter.title}
                                         description={shelter.description}
                                         address={shelter.address}
                                         image={shelter.image}/>
                        )
                    )}
                </div>
            </div>

            <Footer/>
        </div>


    )
}