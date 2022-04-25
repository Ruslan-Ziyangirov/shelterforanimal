import dogShelter from "../../../assets/dog shelter.png";
import {ShelterCard} from "../../components/cards/shelterCard/ShelterCard";
import specHouse from "../../../assets/spec house.png";
import {Footer} from "../../components/footer/Footer";
import {NewsCard} from "../../components/cards/newsCard/NewsCard";
import news1 from "../../../assets/news1.png"
import "./News.sass";
import {collection, getDocs} from "firebase/firestore";
import {database} from "../../config/firebase";
import {useEffect, useState} from "react";

export const News = () => {

    const newsDatabaseRef = collection(database, 'news');
    const [newsInfo, setNewInfo] = useState<any>([]);

    useEffect(() => {
        const getNewsInfo = async () => {
            const data = await getDocs(newsDatabaseRef);
            let arr = data.docs.map((doc) => ({...doc.data()}));
            setNewInfo(arr);
        };
        getNewsInfo().then();
    },[])

    return (
        <div>
            <div className="news-page-body">
                <div className="news-wrapper">
                    <h2>
                        <span>Новости</span>
                    </h2>

                    <div className="news-list">
                        {newsInfo.map((newInfo: any) => (
                                <NewsCard title={newInfo.title}
                                          description={newInfo.description}
                                          date={newInfo.date}
                                          image={newInfo.image}/>
                            )
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}