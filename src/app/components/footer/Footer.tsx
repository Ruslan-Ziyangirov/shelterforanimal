import shelterForAnimals from "../../../assets/ShelterForAnimal.svg";
import {Link} from "react-router-dom";
import {FC} from "react";
import "./Footer.sass"

interface Props{
    name:string,
    height: number|string;
    width:number|string;
}


export const Icon: FC<Props> = ({ name, height,width}) => {
    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            <use xlinkHref={`/sprite.svg#${name}`}></use>
        </svg>
    );
}

export const Footer = () =>{
    return(
        <footer>
            <div className="footer-wrapper">
                <div className="mail">
                    <Icon name="mail" height={20} width={20}/>
                    <p>careForAnimals@mail.ru</p>
                </div>

                <div className="call">
                    <Icon name="call" height={20} width={20}/>
                    <p>+7 (800) 555 55-55</p>
                </div>
            </div>
        </footer>
    )
}