import {FC} from "react";
import "./ButtonSmall.sass"

interface Props{
    title: string;
    border: string;
    width?: string;
    onClick?: any;
}


export const ButtonSmall:FC<Props> = ({title,border, onClick}) =>{
    return(
        <button className="btn-medium" style={{
            border: `${border}`
        }} onClick={onClick}>{title}</button>
    )
}