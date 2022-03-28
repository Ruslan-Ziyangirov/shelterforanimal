import {Button} from "../../components/ui/buttons/large/Button";
import "./Home.sass";
import mainImage from "../../../assets/main-image.png"
import {Footer} from "../../components/footer/Footer";
import mainImg  from "../../../assets/mainImg.png";

export const Home = () =>{


    return(
        <div className="home-page-body">
            <div className="main-information-wrapper">
                <div className="heading-description-btn">
                    <h1>
                        <span>Помоги</span> животным<br/>
                        почувствовать уют
                    </h1>
                    <p>
                        Помогаем бездомным животным вместе. Мы <br/>
                        информируем людей неравнодушных к проблеме<br/>
                        безнадзорных животных, а также призываем <br/>
                        заботиться о животных в приютах.
                    </p>
                    <div className="main-btns-wrapper">
                        <button className="btn-help">Помочь</button>
                        <button className="btn-discover">Узнать больше</button>
                    </div>

                </div>
            </div>
            <img className="main-img" src={mainImg}/>
            <Footer/>
        </div>


    )
}