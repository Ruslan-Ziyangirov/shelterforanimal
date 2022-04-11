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
    apiKey: "AIzaSyAABGzY-znSWrEhpD4EOd_lWpOwZSrscfo",
    authDomain: "shelter-for-animal.firebaseapp.com",
    projectId: "shelter-for-animal",
    storageBucket: "shelter-for-animal.appspot.com",
    messagingSenderId: "793609760199",
    appId: "1:793609760199:web:c0fe0c2b2b974c7d1e3de2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage()
export const database = getFirestore(app);
const usersDatabaseRef = collection(database, 'profile');


export function signUp(email:any,  password:any, userData?:any){
    return createUserWithEmailAndPassword(auth, email, password)
        .then((registeredUser) => {
            addDoc(usersDatabaseRef, {
                uid: registeredUser.user.uid,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
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

export async function upload(file:any, currentUser:any, setLoading:any){
    const fileRef = ref(storage, currentUser.uid + '.png')
    setLoading(true)
    const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)

    await updateProfile(currentUser, {photoURL})

    setLoading(false)
    alert("Uploaded file")
}

