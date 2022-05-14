import {observer} from "mobx-react";
import {useStores} from "../../../../utils/use-stores-hook";
import {Modal} from "../modal";
import profile from "../../../../assets/user.png";
import {Link} from "react-router-dom";
import {ButtonSmall} from "../../ui/buttons/small/ButtonSmall";
import {useAuth} from "../../../config/firebase";
import {SignIn} from "../signIn/SignIn";
import {FC} from "react";
import "./MenuBurger.sass"

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



export const MenuBurger = observer(() =>{

    const { modalStore: {clearCurrentModal, setCurrentModal} } = useStores();

    const onCloseMenu = () => {
        clearCurrentModal();
    };

    const user = useAuth();

    const onOpenModal = () =>{
        setCurrentModal(SignIn);
    }


    return (
        <Modal onClose={clearCurrentModal}>
            <div className="overlay">
                <div className="menu-burger-wrapper">
                    <div className="menu-burger">
                        <button className="btn-close-burger" onClick={onCloseMenu}>
                            <Icon name="close-btn" height="20" width="20"/>
                        </button>

                        <div className="profile-menu-burger">
                            { user ? <div className="profile-header-burger">
                                    <img src={profile}/>
                                    <Link to="/profile" onClick={onCloseMenu}>{user.email}</Link>
                                </div> :
                                <ButtonSmall title={"Войти"} border={"1px solid #713EDD"} onClick={onOpenModal} />
                            }
                        </div>

                        <nav className="navigation-burger">
                            <Link to="/" className="main" onClick={onCloseMenu}>Главная</Link>
                            <Link to="/shelters" onClick={onCloseMenu}>Приюты</Link>
                            <Link to="/volunteering" onClick={onCloseMenu}>Что такое волонтерство</Link>
                            <Link to="/news" onClick={onCloseMenu}>Новости</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </Modal>
    )
})