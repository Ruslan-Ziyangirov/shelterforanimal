import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {logOut, useAuth} from "../../config/firebase";

export const Profile = () =>{

    const [loading, setLoading] = useState(false)
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
        <div>
            <h1>ХЕЛЛОУ ИЛИ НЕ ХЕЛЛОУ?</h1>
            <p>{user?.email}</p>
            <button disabled={loading|| !user} onClick={handleLogout}>Не хеллоу</button>
        </div>
    )
}