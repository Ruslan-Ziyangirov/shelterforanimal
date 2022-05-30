import {FC, useState} from "react";
import "./Stars.sass"
import { FaStar } from  "react-icons/fa"
import {a} from "@react-spring/web";
import {collection, doc, updateDoc} from "firebase/firestore";
import {database} from "../../config/firebase";
import {toast} from "react-toastify";

interface Star {
    id?: number
    ratingShelter?: number;
    shortNameDoc: string;
    numberOfVoters: number;
}



export const Stars: FC<Star> = ({ratingShelter, shortNameDoc, numberOfVoters}) =>{

    const [rating, setRating] = useState<any>();
    const [hover, setHover] = useState<any>(null);


    const putARating = async (ratingV:any) =>{
        const newCountNumberOfVotes = numberOfVoters + 1;
        const shelterDocRef = doc(database, 'shelters', shortNameDoc);
        console.log("Отправляю рейтинг: "+ratingV)
        let average = (ratingShelter + ratingV)/ newCountNumberOfVotes;
        console.log("Посчитал новое среднее значение: " + average);

        console.log("Приравнял к целому числу: " + Math.round(average))

        await updateDoc(shelterDocRef, {
            "rating": Math.round(average),
            "numberOfVoters": newCountNumberOfVotes
        });

        toast('Спасибо, ваш отзыв учтен!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            type: 'success',
            draggable: true,
            progress: undefined,
        })
    }

    return(
        <div className="stars-wrapper">
            {
                [ ... Array(5)].map((star, index) =>{
                    let ratingValue = index + 1;

                   return (
                       <label>
                           <input
                               type="radio"
                               name="rating"
                               value={ratingValue}
                               onClick={() => {
                                   console.log("Нажал значение: "+ ratingValue)
                                   putARating(ratingValue);

                               }}
                           />
                           <FaStar
                               className="star"
                               size={26}
                               color = {ratingValue <= (hover || ratingShelter) ? "#ffc107" : "#e4e5e9"}
                               onMouseEnter={() => setHover(ratingValue)}
                               onMouseLeave={() => setHover(null)}
                           />
                       </label>

                   )
                })
            }
        </div>
    )
}