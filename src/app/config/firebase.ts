// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile

} from "@firebase/auth";
import {addDoc, collection, getFirestore} from 'firebase/firestore';
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {useEffect, useState} from "react";

const firebaseConfig = {
    apiKey: "AIzaSyDtnxlXITLyZMapzZvle6MxzUDIIQ3xbMw",
    authDomain: "shelterforanimalnew.firebaseapp.com",
    projectId: "shelterforanimalnew",
    storageBucket: "shelterforanimalnew.appspot.com",
    messagingSenderId: "941478700876",
    appId: "1:941478700876:web:ef5fcb7bc96f232aee51e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage()
export const database = getFirestore(app);
const usersDatabaseRef = collection(database, 'profile');
const historyDatabaseRef = collection(database, 'history');





export function signUp(email:any,  password:any, userData?:any){
    return createUserWithEmailAndPassword(auth, email, password)
        .then((registeredUser) => {
            addDoc(usersDatabaseRef, {
                uid: registeredUser.user.uid,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                photoURL: "https://i02.fotocdn.net/s121/fced1b9cb79eecf2/user_xl/2762630212.jpg",
            })
                .then(res => console.log(res));
        })
}




export function signIn(email:any, password:any){
    return signInWithEmailAndPassword(auth, email, password);
}

export function logOut(){
    return signOut(auth)
}

export function useAuth(){
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsub
    },[])

    return currentUser;
}



export async function uploadUserPhoto(file:any, currentUser:any, setLoading:any){
    const fileRef = ref(storage, currentUser.uid + '.png')
    setLoading(true)
    const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)

    await updateProfile(currentUser, {photoURL})

    setLoading(false)
    alert("Uploaded file")
}


