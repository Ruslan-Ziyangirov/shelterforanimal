import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {database, logOut, upload, useAuth} from "../../config/firebase";
import "./Profile.sass"
import avatar from "../../../assets/dog shelter.png"
import {ButtonMedium} from "../../components/ui/buttons/medium/ButtonMedium";
import {ButtonSmall} from "../../components/ui/buttons/small/ButtonSmall";
import {VisitCard} from "../../components/visitCard/VisitCard";
import {collection, getDocs} from "firebase/firestore";
import firebase from "firebase/compat";


export const Profile = () =>{

    const [photoURL, setPhotoURL] = useState(avatar)
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const [usersInfo, setUsersInfo] = useState<any>([]);
    const usersDatabaseRef = collection(database, 'profile');


    useEffect(() => {
        const getUserInfo = async () => {
            const data = await getDocs(usersDatabaseRef);
            setUsersInfo(data.docs.map((doc) => ({...doc.data()})))
        };
        getUserInfo().then(err => console.log(err));
    }, [])


    let router = useNavigate()
    const user = useAuth()

    async function handleLogout(){
        setLoading(true)
        try {
            await logOut()
            router('/')
        } catch {
            alert("Error!")
        }
        setLoading(false)
    }

    return(
        <div className="profile-wrapper">
            <h1>Личный кабинет</h1>

            {usersInfo.map((usersInfo:any) =>(
                <div className="personal-card">
                    <div className="personal-information-wrapper">
                        <img className="personal-img" src={avatar} />
                        <h3 key={usersInfo.name}>
                            {usersInfo.name}
                        </h3>
                        <p key={usersInfo.phone}>
                            {usersInfo.phone}
                        </p>
                        <p key={usersInfo.email}>
                            {usersInfo.email}
                        </p>
                        <input type="file" className="upload-file" />
                        <ButtonMedium title={"Поменять фото"}
                                      background={"#713EDD"}
                                      color={"white"}
                                      disabled={loading || !photo}
                                      />
                        <ButtonSmall disabled={loading|| !user}
                                     onClick={handleLogout}
                                     border={"1px solid #713EDD"}
                                     title={"Выйти"}></ButtonSmall>
                    </div>

                    <div className="visit-history-wrapper">
                        <h4>История</h4>
                        <VisitCard title={"Радость"} date={"16.03.2022"} count={"500"}/>
                        <VisitCard title={"Кошкин дом"} date={"16.02.2021"} count={"2300"}/>
                        <VisitCard title={"Улыбка"} date={"03.03.2020"} count={"1000"}/>
                    </div>
                </div>
                )
            )}



        </div>
    )
}