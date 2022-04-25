import {Link} from "react-router-dom";
import "./Header.sass";
import shelterForAnimals from"../../../assets/ShelterForAnimal.svg"
import {ButtonSmall} from "../ui/buttons/small/ButtonSmall";
import {observer} from "mobx-react";
import {useStores} from "../../../utils/use-stores-hook";
import {SignIn} from "../modals/signIn/SignIn";
import {useAuth} from "../../config/firebase";
import {FC} from "react";
import profile from "../../../assets/user.png"


interface Props{
    name:string,
    height: number|string;
    width:number|string;
}


export const Icon: FC<Props> = ({ name, height,width}) => {
    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            <use xlinkHref={`/sprite.svg#${name}`}></use>
        </svg>
    );
}


export const Header = observer(() => {

    const {modalStore: { setCurrentModal } } = useStores();

    const user = useAuth();

    const onOpenModal = () =>{
        setCurrentModal(SignIn);
    }

    return(
        <header>
            <div className="header">
                <Link to="/">
                    <img src={shelterForAnimals}/>
                </Link>


                <div className="navigation">
                    <nav>
                        <Link to="/" className="main">Главная</Link>
                        <Link to="/shelters">Приюты</Link>
                        <Link to="/volunteering">Что такое волонтерство</Link>
                        <Link to="/news">Новости</Link>
                    </nav>
                </div>

                { user ? <div className="profile-header">
                            <img src={profile}/>
                            <Link to="/profile">{user.email}</Link>
                        </div> :
                        <ButtonSmall title={"Войти"} border={"1px solid #713EDD"} onClick={onOpenModal} />
                }

            </div>
        </header>
    )
})