import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {database, logOut, storage, useAuth} from "../../config/firebase";
import "./Profile.sass"
import {ButtonMedium} from "../../components/ui/buttons/medium/ButtonMedium";
import {VisitCard} from "../../components/cards/visitCard/VisitCard";
import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {observer} from "mobx-react";
import {getAuth, onAuthStateChanged, updateProfile} from "@firebase/auth";
import {toast} from "react-toastify";
import {SkeletonProfilePage} from "../../components/aimation/skeleton/skeletonProfilePage/SkeletonProfilePage";
import "firebase/compat/storage";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {Footer} from "../../components/footer/Footer";


export const Profile = observer(() =>{

    const profileDocRef = doc(database, 'profile', "IRP8twdILbz5XYIJ3gmc");
    const usersDatabaseRef = collection(database, 'profile');
    const historyDatabaseRef = collection(database, 'history');

    const currentUser = useAuth()
    let uid = "";
    let router = useNavigate()
    const auth = getAuth();

    const [photo, setPhoto] = useState(null)
    const [photoURL, setPhotoURL] = useState(currentUser?.photoURL)
    const [loading, setLoading] = useState(false);
    const [usersInfo, setUsersInfo] = useState<any>([]);
    const [visitHistory, setVisitHistory] = useState<any>([]);

    onAuthStateChanged(auth, (user) => {
        if (user) {
             uid = user.uid;
        } else {

        }
    });

    function handleChange(e: any) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
        }
        console.log(photo)
    }

    function handleClick() {
        updateDoc(profileDocRef, {
            "photoURL": "https://sun9-west.userapi.com/sun9-61/s/v1/ig2/RT9stY8SZrahFFo0sPTGpdY_GRb2D5dRI4OCAOP6yral0UQEkGqv4szvq2IIv2V9jDX9gJinv4ECY_bnrkBcA0Pa.jpg?size=1080x1080&quality=95&type=album"
        });
        window.location.reload()
    }

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
                                <input type="file" className="upload-file" multiple={true} onChange={handleChange} />
                                <ButtonMedium title={"Поменять фото"}
                                              background={"#713EDD"}
                                              color={"white"}
                                              onClick={handleClick}
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