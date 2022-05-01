import {collection, getDocs} from "firebase/firestore";
import {database} from "../app/config/firebase";

const sheltersDatabaseRef = collection(database, 'shelters');

export const getSheltersInfo = async () => {
        const data = await getDocs(sheltersDatabaseRef);
        return data.docs.map((doc) => ({...doc.data()}));
};