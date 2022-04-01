import shelterForAnimals from "../../../../../assets/ShelterForAnimal.svg";
import {Link} from "react-router-dom";
import {FC} from "react";
import "./Button.sass";

interface Props{
    title: string;
    color: string;
    background: string;
    border?: string;
    width?: string
}

export const Button:FC<Props> = ({title,color,background,border, width}) =>{


    return(
        <button className="btn" style={{
            color: `${color}`,
            background: `${background}`,
            border: `${border}`,
            width: `${width}`
        }}>{title}</button>
    )
}