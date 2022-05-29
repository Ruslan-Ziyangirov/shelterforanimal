import {Link, NavLink} from "react-router-dom";
import "./Header.sass";
import shelterForAnimals from"../../../assets/ShelterForAnimal.svg"
import {ButtonSmall} from "../ui/buttons/small/ButtonSmall";
import {observer} from "mobx-react";
import {useStores} from "../../../utils/use-stores-hook";
import {SignIn} from "../modals/signIn/SignIn";
import {database, useAuth} from "../../config/firebase";
import {FC, useEffect, useState} from "react";
import profile from "../../../assets/user.png";
import menuBurger from "../../../svg-icons/menu-burger.svg";
import {MenuBurger} from "../modals/menuBurger/MenuBurger";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import {collection, getDocs} from "firebase/firestore";
import {inspect} from "util";


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
    const auth = getAuth();
    let uid = "";

    const [usersInfo, setUsersInfo] = useState<any>([]);
    const usersDatabaseRef = collection(database, 'profile');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid;
        } else {
        }
    });

    useEffect(() => {
        const getUserInfo = async () => {
            const data = await getDocs(usersDatabaseRef);
            let arr = data.docs.map((doc) => ({...doc.data()}))
            let user = arr.findIndex(function (user,index){
                return user.uid === uid
            })
            let ans = arr[user]
            setUsersInfo(ans)
        };
        getUserInfo().then();
    }, [])

    const onOpenModal = () =>{
        setCurrentModal(SignIn);
    }
    
    const onOpenMenuBurger = () => {
        setCurrentModal(MenuBurger);
    }

    return(
        <header>
            <div className="header">
                <Link to="/">
                    <img src={shelterForAnimals}/>
                </Link>


                <div className="navigation">
                    <nav>
                        <NavLink to="/"
                                 className={({isActive}) => isActive ? "mainNavLinkActive" : "mainNavLink"}>
                            Главная
                        </NavLink>
                        <NavLink to="/shelters"
                                 className={({isActive}) => isActive ? "mainNavLinkActive" : "mainNavLink"}>
                            Приюты</NavLink>
                        <NavLink to="/volunteering"
                                 className={({isActive}) => isActive ? "mainNavLinkActive" : "mainNavLink"}>
                            Что такое волонтерство</NavLink>
                        <NavLink to="/news"
                                 className={({isActive}) => isActive ? "mainNavLinkActive" : "mainNavLink"}
                        >
                            Новости</NavLink>
                    </nav>
                </div>
                    {
                        user ? <div className="profile-header">
                                <img src={usersInfo.photoURL}/>
                                <Link to="/profile">{usersInfo.name}</Link>
                            </div> :
                            <div className="btn-signIn-header">
                                <ButtonSmall title={"Войти"} border={"1px solid #713EDD"} onClick={onOpenModal} />
                            </div>

                    }
                <button className="menu-burger-btn" onClick={onOpenMenuBurger} >
                    <img src={menuBurger} alt={"меню"}/>
                </button>
            </div>
        </header>
    )
})