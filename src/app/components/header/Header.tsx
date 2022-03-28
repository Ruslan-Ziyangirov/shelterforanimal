import {Link} from "react-router-dom";
import "./Header.sass";
import shelterForAnimals from"../../../assets/ShelterForAnimal.svg"
import {ButtonMedium} from "../ui/buttons/medium/ButtonMedium";

export const Header = () => {

    return(
        <header>
            <div className="header">
                <img src={shelterForAnimals}/>

                <div className="navigation">
                    <nav>
                        <Link to="/" className="main">Главная</Link>
                        <Link to="/shelters">Приюты</Link>
                        <Link to="/volunteering">Что такое волонтерство</Link>
                        <Link to="/news">Новости</Link>
                    </nav>
                </div>
                <ButtonMedium title={"Войти"} border={"1px solid #713EDD"}/>
            </div>


        </header>
    )
}