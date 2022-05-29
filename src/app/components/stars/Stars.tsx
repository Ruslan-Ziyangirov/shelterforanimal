import {FC, useState} from "react";
import "./Stars.sass"
import { FaStar } from  "react-icons/fa"
import {a} from "@react-spring/web";

interface Star {
    id?: number
    ratingShelter?: number
}



export const Stars: FC<Star> = ({ratingShelter, id}) =>{
    const [rating, setRating] = useState<any>(null);
    const [hover, setHover] = useState<any>(null);

    return(
        <div className="stars-wrapper">
            {
                [ ... Array(5)].map((star, index) =>{
                    const ratingValue = index + 1;

                   return (
                       <label>
                           <input
                               type="radio"
                               name="rating"
                               value={ratingValue}
                               onClick={()=>(
                                   setRating(ratingValue)
                               )}
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