import "./ButtonMedium.sass"
import {FC} from "react";

interface Props{
    title: string;
    color: string;
    background: string;
    onClick?: () => void;
    type:any
}

export const ButtonMedium:FC<Props> = ({title, color, background, onClick, type}) =>{
    return(
        <button onClick={onClick} type={type} className="btn-for-modal" style={{
            color: `${color}`,
            background: `${background}`,
        }}>{title}</button>
    )
}