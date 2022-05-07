import "./VisitCard.sass"
import {FC} from "react";

interface History{
    title: string;
    date: string
    time: string
}


export const VisitCard:FC<History> = ({title,time,date}) =>{
    return(
        <div className="visit-card-wrapper">
                <div>
                    <h5>Название приюта</h5>
                    <p>{title}</p>
                </div>

                <div className="date">
                    <h5>Дата посещения</h5>
                    <p>{date}</p>
                </div>

                <div className="charity">
                    <h5>Время</h5>
                    <p>{time}</p>
                </div>
        </div>
    )
}