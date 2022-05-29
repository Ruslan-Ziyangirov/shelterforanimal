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
import {SkeletonSheltersPage} from "../../components/aimation/skeleton/skeletonSheltersPage/SkeletonSheltersPage";
import {SkeletonNewsPage} from "../../components/aimation/skeleton/skeletonNewsPage/SkeletonNewsPage";

export const News = () => {

    const newsDatabaseRef = collection(database, 'news');
    const [newsInfo, setNewInfo] = useState<any>([]);
    const [loading,setLoading] = useState<any>([]);


    useEffect(() => {
        const getNewsInfo = async () => {
            const data = await getDocs(newsDatabaseRef);
            let arr = data.docs.map((doc) => ({...doc.data()}));
            setNewInfo(arr);
        };
        getNewsInfo().then();
    },[])

    useEffect(() => {
        setLoading(true);
        const timing = setTimeout(() => {
            setLoading(false);
        }, 1800);
        return () => clearTimeout(timing);
    }, []);

    return (
        <div>
            <div className="news-page-body">
                <div className="news-wrapper">
                    {loading ? <SkeletonNewsPage/> :
                        <>
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
                        </>
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}