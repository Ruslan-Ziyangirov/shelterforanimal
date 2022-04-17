import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {database, logOut, uploadUserPhoto, useAuth} from "../../config/firebase";
import "./Profile.sass"
import avatar from "../../../assets/dog shelter.png"
import {ButtonMedium} from "../../components/ui/buttons/medium/ButtonMedium";
import {ButtonSmall} from "../../components/ui/buttons/small/ButtonSmall";
import {VisitCard} from "../../components/visitCard/VisitCard";
import {collection, getDocs} from "firebase/firestore";
import firebase from "firebase/compat";
import {SignIn} from "../../components/modals/signIn/SignIn";
import {useStores} from "../../../utils/use-stores-hook";
import {observer} from "mobx-react";
import {WriteHistory} from "../../components/modals/writeHistory/WriteHistory";


export const Profile = observer(() =>{

    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(avatar);
    const [loading, setLoading] = useState(false);
    const [usersInfo, setUsersInfo] = useState<any>([]);
    const [visitHistory, setVisitHistory] = useState<any>([]);

    const {modalStore: { setCurrentModal } } = useStores();

    const usersDatabaseRef = collection(database, 'profile');
    const historyDatabaseRef = collection(database, 'history');
    const currentUser = useAuth()

    let router = useNavigate()

    const onOpenModal = () =>{
        setCurrentModal(WriteHistory);
    }

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

    function handleChange(e:any){
        if(e.target.files[0]){
            setPhoto(e.target.files[0])
        }
    }

    function handleClick(){
        uploadUserPhoto(photo, currentUser, setLoading)
    }

    useEffect(()=>{
        if (currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL)
        }
    }, [currentUser])

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

        const getHistoryInfo = async () =>{
            const data = await getDocs(historyDatabaseRef);
            let arr = data.docs.map((doc) => ({...doc.data()}))
            let history = arr.filter(function (history,index){
                return history.uid === currentUser.uid
            })
            console.log(history)
            setVisitHistory(history)
            console.log(visitHistory)

        };
        getHistoryInfo().then(err => console.log(err))
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
                        <input type="file" className="upload-file" onChange={handleChange}/>
                        <ButtonMedium title={"Поменять фото"}
                                      background={"#713EDD"}
                                      color={"white"}
                                      onClick={handleClick}
                                      disabled={loading || !photo}
                                      />

                        <ButtonSmall disabled={loading|| !currentUser}
                                     onClick={handleLogout}
                                     border={"1px solid #713EDD"}
                                     title={"Выйти"}></ButtonSmall>
                    </div>

                     <div className="visit-history-wrapper">
                        <h4>История</h4>
                         {visitHistory.map((visit:any) =>(
                             <VisitCard title={visit.title} date={visit.date} count={visit.count}/>
                             )
                         )}
                         <ButtonMedium title={"Добавить запись"}
                                       color={"white"}
                                       background={"#713EDD"}
                                        onClick={onOpenModal}/>
                    </div>
                </div>
        </div>
    )
})