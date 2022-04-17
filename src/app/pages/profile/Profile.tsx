import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {database, logOut, useAuth} from "../../config/firebase";
import "./Profile.sass"
import avatar from "../../../assets/dog shelter.png"
import {ButtonMedium} from "../../components/ui/buttons/medium/ButtonMedium";
import {ButtonSmall} from "../../components/ui/buttons/small/ButtonSmall";
import {VisitCard} from "../../components/visitCard/VisitCard";
import {collection, getDocs} from "firebase/firestore";
import firebase from "firebase/compat";


export const Profile = () =>{

    const [loading, setLoading] = useState(false);
    const [usersInfo, setUsersInfo] = useState<any>([]);
    const [visitHistory, setVisitHistory] = useState<any>([]);



    const usersDatabaseRef = collection(database, 'profile');
    const historyDatabaseRef = collection(database, 'history');
    const currentUser = useAuth()

    let router = useNavigate()



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


    useEffect(() => {

        const getUserInfo = async () => {
            const data = await getDocs(usersDatabaseRef);
            let arr = data.docs.map((doc) => ({...doc.data()}))
            let user = arr.findIndex(function (user,index){
                return user.uid === currentUser.uid
            })
            let ans = arr[user]
            console.log(ans)
            setUsersInfo(ans)
            console.log(usersInfo)
        };
        getUserInfo().then(err => console.log(err));
    }, [])

    return(
        <div className="profile-wrapper">
            <h1>Личный кабинет</h1>
                <div className="personal-card">
                    <div className="personal-information-wrapper">
                        <img className="personal-img" src={usersInfo.photoURL} />
                        <h3>
                            {usersInfo.name}
                        </h3>
                        <p>
                            {usersInfo.phone}
                        </p>
                        <p>
                            {usersInfo.email}
                        </p>
                        а
                        <input type="file" className="upload-file"  />
                        <ButtonMedium title={"Поменять фото"}
                                      background={"#713EDD"}
                                      color={"white"}
                                      />

                        <ButtonSmall disabled={loading|| !currentUser}
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
        </div>
    )
}