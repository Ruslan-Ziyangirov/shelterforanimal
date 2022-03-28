import {FC} from "react";
import "./ButtonMedium.sass"

interface Props{
    title: string;
    border: string;
    width?: string
}


export const ButtonMedium:FC<Props> = ({title,border}) =>{
    return(
        <button className="btn-medium" style={{
            border: `${border}`
        }}>{title}</button>
    )
}