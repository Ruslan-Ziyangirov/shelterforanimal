import dogShelter from "../../../assets/dog shelter.png";
import {ShelterCard} from "../../components/shelterCard/ShelterCard";
import specHouse from "../../../assets/spec house.png";
import {Footer} from "../../components/footer/Footer";
import {NewsCard} from "../../components/newsCard/NewsCard";
import news1 from "../../../assets/news1.png"
import "./News.sass";

export const News = () => {
    return(
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
                        <NewsCard title={"Помочь братьям меньшим: пять волонтерских программ для животных"}
                                  description={"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint." +
                                  " Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."}
                                  date={"8 ноября 2018"} image={news1}/>
                        <NewsCard title={"Зачем помогать приютам для домашних животных и как это сделать"}
                                  description={"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint." +
                                  " Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."}
                                  date={"30 июля 2018"} image={news1}/>

                    </div>
                </div>

                <Footer/>
            </div>
        </div>
    )
}