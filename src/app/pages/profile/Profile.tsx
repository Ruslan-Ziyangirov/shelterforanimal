import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {database, logOut, useAuth} from "../../config/firebase";
import "./Profile.sass"
import avatar from "../../../assets/dog shelter.png"
import {ButtonMedium} from "../../components/ui/buttons/medium/ButtonMedium";
import {VisitCard} from "../../components/cards/visitCard/VisitCard";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {observer} from "mobx-react";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import test from "../../../assets/1920x1200_1388552_[www.ArtFile.ru].jpg"
import {toast} from "react-toastify";
import {SkeletonSheltersPage} from "../../components/aimation/skeleton/skeletonSheltersPage/SkeletonSheltersPage";
import {SkeletonProfilePage} from "../../components/aimation/skeleton/skeletonProfilePage/SkeletonProfilePage";


export const Profile = observer(() =>{

    const usersDatabaseRef = collection(database, 'profile');
    const historyDatabaseRef = collection(database, 'history');
    const currentUser = useAuth()
    let uid = "";
    let router = useNavigate()
    const auth = getAuth();

    const [file, setFile] = useState('');
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

    function handleChange(e: any) {
        if (e.target.files[0]) {
            setFile(URL.createObjectURL(e.target.files[0]));
        }
        console.log(file)
    }

    const profileDocRef = doc(database, 'profile', "IRP8twdILbz5XYIJ3gmc");


    const updatePhoto = async () =>{
        console.log(file + " фото юрл ")
        await updateDoc(profileDocRef, {
            "photoURL": test,
        });
    }


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

    useEffect(() => {
        setLoading(true);
        const timing = setTimeout(() => {
            setLoading(false);
        }, 1800);
        return () => clearTimeout(timing);
    }, []);

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
                            <input type="file" className="upload-file" multiple={true} onChange={handleChange}/>
                            <ButtonMedium title={"Поменять фото"}
                                          background={"#713EDD"}
                                          color={"white"}
                                          onClick={updatePhoto}
                            />
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