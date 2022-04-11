import {FC} from "react";
import "./ButtonSmall.sass"

interface Props{
    title: string;
    border?: string;
    width?: string;
    onClick?: any;
    disabled?: any;
}


export const ButtonSmall:FC<Props> = ({title,border, onClick, disabled, width}) =>{
    return(
        <button disabled={disabled} className="btn-medium" style={{
            border: `${border}`,
            width: `${width}`
        }} onClick={onClick}>{title}</button>
    )
}