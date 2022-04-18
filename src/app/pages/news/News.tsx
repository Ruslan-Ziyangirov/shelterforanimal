import dogShelter from "../../../assets/dog shelter.png";
import {ShelterCard} from "../../components/shelterCard/ShelterCard";
import specHouse from "../../../assets/spec house.png";
import {Footer} from "../../components/footer/Footer";
import {NewsCard} from "../../components/newsCard/NewsCard";
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
            console.log(newsInfo);
            setNewInfo(arr);
        };
        getNewsInfo().then(err => console.log(err));
    })

    return (
        <div>
            <div className="news-page-body">
                <div className="news-wrapper">
                    <h2>
                        <span>Новости</span>
                    </h2>

                    <div className="news-list">
                        <NewsCard title={"Зооволонтеры в наше время: кто бескорыстно борется за жизнь животных"}
                                  description={"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint." +
                                      " Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."}
                                  date={"30 июля 2018"} image={news1}/>
                        {newsInfo.map((newInfo: any) => (
                                <NewsCard title={newInfo.title}
                                          description={newInfo.description}
                                          date={newInfo.date}
                                          image={newInfo.image}/>
                            )
                        )}
                    </div>
                </div>

                <Footer/>
            </div>
        </div>
    )
}