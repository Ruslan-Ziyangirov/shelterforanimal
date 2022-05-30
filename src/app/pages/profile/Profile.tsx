import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {database, logOut, useAuth} from "../../config/firebase";
import "./Profile.sass"
import {ButtonMedium} from "../../components/ui/buttons/medium/ButtonMedium";
import {VisitCard} from "../../components/cards/visitCard/VisitCard";
import {collection, doc, getDocs} from "firebase/firestore";
import {observer} from "mobx-react";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import {toast} from "react-toastify";
import {SkeletonProfilePage} from "../../components/aimation/skeleton/skeletonProfilePage/SkeletonProfilePage";
import "firebase/compat/storage";


export const Profile = observer(() =>{

    const usersDatabaseRef = collection(database, 'profile');
    const historyDatabaseRef = collection(database, 'history');
    const currentUser = useAuth()
    let uid = "";
    let router = useNavigate()
    const auth = getAuth();

    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    const [loading, setLoading] = useState(false);
    const [usersInfo, setUsersInfo] = useState<any>([]);
    const [visitHistory, setVisitHistory] = useState<any>([]);

    onAuthStateChanged(auth, (user) => {
        if (user) {
             uid = user.uid;
        } else {

        }
    });

    async function handleLogout(){
        setLoading(true)
        try {
            await logOut()
            router('/')
            toast('Вы успешно вышли из аккаунта!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                type: 'success',
                draggable: true,
                progress: undefined,
            })
        } catch {
            toast('Вы не смогли выйти из аккаунта', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                type: 'error',
                draggable: true,
                progress: undefined,
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true);
        const timing = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timing);
    }, []);


    const profileDocRef = doc(database, 'profile', "IRP8twdILbz5XYIJ3gmc");




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

    const getHistoryInfo = async () =>{
        const data = await getDocs(historyDatabaseRef);
        let arr = data.docs.map((doc) => ({...doc.data()}))
        let history = arr.filter(function (history,index){
            return history.uid === uid
        })
        setVisitHistory(history)
    };

    useEffect(() => {
        getHistoryInfo();
    },[])


    return(
        <div className="profile-wrapper">
            {loading ? <SkeletonProfilePage/> :
                <>
                    <h1>Личный кабинет</h1>
                    <div className="personal-card">
                        <div className="personal-information-wrapper">
                            <img className="personal-img" src={usersInfo.photoURL} alt="фото"/>
                            <h3>
                                {usersInfo.name}
                            </h3>
                            <p>
                                {usersInfo.phone}
                            </p>
                            <p>
                                {usersInfo.email}
                            </p>
                            <form>
                                <input type="file" className="upload-file" multiple={true} />
                                <ButtonMedium title={"Поменять фото"}
                                              background={"#713EDD"}
                                              color={"white"}
                                />
                            </form>
                            <button disabled={loading || !currentUser}
                                    onClick={handleLogout} className="output">
                                Выйти
                            </button>
                        </div>

                        <div className="visit-history-wrapper">
                            <h4>История посещений</h4>
                            {visitHistory.map((visit: any) => (
                                    <VisitCard title={visit.title} date={visit.date} time={visit.time}/>
                                )
                            )}

                        </div>
                    </div>
                </>
            }
        </div>
    )
})