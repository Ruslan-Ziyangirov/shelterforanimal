import {Icon} from "../shelterCard/ShelterCard";
import {FC, useState} from "react";
import "./NewsCard.sass";
import {NewsCardBottomSheet} from "../../bottomSheet/NewsCardBottomSheet";

interface Props{
    title:string;
    description: string;
    date:string
    image:string;
}



export const NewsCard:FC<Props> = ({title,description,date,image}) =>{

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onDescriptionClick = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div className="news-card-wrapper">
            <div className="image-description">
                <img src={image}/>

                <div className="information-news-card">
                    <h3>
                        {title}
                    </h3>

                    <div className="description">
                        <p>
                            {description}
                        </p>

                        <div className="date-wrapper">
                            <Icon name="calendar" height="24" width="24"/>
                            <p>{date}</p>
                        </div>
                    </div>

                    <button className="description-mobile" onClick={onDescriptionClick}>
                        <p>Открыть описание</p>
                        <Icon name={"arrow-down"} width={12} height={12}/>
                    </button>
                </div>
            </div>
            <NewsCardBottomSheet isOpen={isOpen} date={date} description={description}/>
        </div>
    )
}