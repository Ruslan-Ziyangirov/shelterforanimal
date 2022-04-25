import {FC} from "react";
import "./ButtonSmall.sass"

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



interface Button{
    title: string;
    border?: string;
    width?: string;
    onClick?: any;
    disabled?: any;
}

export const ButtonSmall:FC<Button> = ({title,border, onClick, disabled, width}) =>{
    return(
        <button disabled={disabled} className="btn-small" style={{
            border: `${border}`,
            width: `${width}`
        }} onClick={onClick}>
            <p>
                {title}
            </p>
            <Icon name={"arrow-signIn"} width={16} height={16}/>
        </button>
    )
}