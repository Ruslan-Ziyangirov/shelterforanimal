import {Icon} from "../shelterCard/ShelterCard";
import {FC} from "react";
import "./NewsCard.sass";

interface Props{
    title:string;
    description: string;
    date:string
    image:string;
}



export const NewsCard:FC<Props> = ({title,description,date,image}) =>{
    return(
        <div className="news-card-wrapper">
            <div className="image-description">
                <img src={image}/>

                <div className="information-news-card">
                    <h3>
                        {title}
                    </h3>

                    <p>
                        {description}
                    </p>

                    <div className="date-wrapper">
                        <Icon name="calendar" height="24" width="24"/>

                        <p>{date}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}