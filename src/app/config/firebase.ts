// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "@firebase/auth";
import {getStorage} from "firebase/storage";
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


export function signUp(email:any,  password:any){
    return createUserWithEmailAndPassword(auth, email, password)
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
