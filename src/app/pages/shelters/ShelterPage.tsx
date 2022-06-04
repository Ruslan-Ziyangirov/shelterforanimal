import "./ShelterPage.sass"
import {ShelterCard} from "../../components/cards/shelterCard/ShelterCard";
import dogShelter from "../../../assets/dog shelter.png"
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {database, useAuth} from "../../config/firebase";
import {Link} from "react-router-dom";
import {SkeletonSheltersPage} from "../../components/aimation/skeleton/skeletonSheltersPage/SkeletonSheltersPage";

export const ShelterPage = () =>{

    const currentUser = useAuth();

    const [sheltersInfo, setShelterInfo] = useState<any>([]);
    const sheltersDatabaseRef = collection(database, 'shelters');
    const [loading,setLoading] = useState<any>([]);

    useEffect(()=>{
        const getSheltersList = async () =>{
            const data = await getDocs(sheltersDatabaseRef);
            let arr = data.docs.map((doc) => ({...doc.data()}))
            setShelterInfo(arr)
        };
            getSheltersList().then();
    },[])

    useEffect(() => {
        setLoading(true);
        const timing = setTimeout(() => {
            setLoading(false);
        }, 1800);
        return () => clearTimeout(timing);
    }, []);

    return(
        <div className="shelter-page-body">
                <div className="shelters-wrapper">
                    {loading ? <SkeletonSheltersPage/> :
                        <>
                            <h2>
                                <span>Приюты</span> Казани
                            </h2>
                            <img className="dog-shelter" src={dogShelter}/>

                            <div className="shelter-list">
                                <div className="shelter-list-wrapper">
                                    {sheltersInfo.map((shelter: any) => (
                                            <Link className="btn-shelter" to={`/shelters/${shelter.id}`}>
                                                <ShelterCard title={shelter.title}
                                                             description={shelter.description}
                                                             address={shelter.address}
                                                             image={shelter.image}
                                                             rating={shelter.rating}
                                                             shortName={shelter.shortName}
                                                             numberOfVoters={shelter.numberOfVoters}
                                                />
                                            </Link>

                                        )
                                    )}
                                </div>
                            </div>
                        </>

                    }
                </div>
        </div>
    )
}