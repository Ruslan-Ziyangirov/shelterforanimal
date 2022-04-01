import {Link} from "react-router-dom";
import "./Header.sass";
import shelterForAnimals from"../../../assets/ShelterForAnimal.svg"
import {ButtonSmall} from "../ui/buttons/small/ButtonSmall";
import {observer} from "mobx-react";
import {useStores} from "../../../utils/use-stores-hook";
import {SignIn} from "../modals/signIn/SignIn";

export const Header = observer(() => {

    const {modalStore: { setCurrentModal } } = useStores();

    const onOpenModal = () =>{
        setCurrentModal(SignIn);
    }

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
                <ButtonSmall title={"Войти"} border={"1px solid #713EDD"} onClick={onOpenModal}/>
            </div>
        </header>
    )
})