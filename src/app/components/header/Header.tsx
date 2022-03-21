import {Link} from "react-router-dom";
import "./Header.sass";
import shelterForAnimals from"../../../assets/ShelterForAnimal.svg"

export const Header = () => {

    return(
        <header>
            <div className="header">
                <img src={shelterForAnimals}/>

                <div className="navigation">
                    <nav>
                        <Link to="/" className="main">Главная</Link>
                        <Link to="/shelters">Приюты</Link>
                        <Link to="">Что такое волонтерство</Link>
                        <Link to="">Новости</Link>
                    </nav>
                </div>
            </div>


        </header>
    )
}