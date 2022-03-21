

import {Footer} from "../../components/footer/Footer";
import "./ShelterPage.sass"
import {ShelterCard} from "../../components/shelterCard/ShelterCard";
import specHouse from "../../../assets/spec house.png"

export const ShelterPage = () =>{


    return(
        <div className="shelter-page-body">
            <div className="shelters-wrapper">
                <h2>
                    <span>Приюты</span> Казани
                </h2>

                <div className="shelter-list">
                    <ShelterCard title={"Spec House"} description={"Amet minim mollit non deserunt ullamco est sit" +
                    " aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam " +
                    "consequat sunt nostrud amet."} address={"Гвардейская ул., 46А/1"} image={specHouse}/>

                    <ShelterCard title={"Spec House"} description={"Amet minim mollit non deserunt ullamco est sit" +
                    " aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam " +
                    "consequat sunt nostrud amet."} address={"Гвардейская ул., 46А/1"} image={specHouse}/>
                </div>
            </div>

            <Footer/>
        </div>


    )
}