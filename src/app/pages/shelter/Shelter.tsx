import {Stars} from "../../components/stars/Stars";
import {FC} from "react";
import "./Shelter.sass"
import shelterImg from "../../../assets/spec house.png";
import {Footer} from "../../components/footer/Footer";

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



export const Shelter = () =>{
    return(
        <>
        <div className="shelter-body-wrapper">
            <h2>
                <span>Приюты</span> Казани
            </h2>

            <div className="shelter-information-wrapper">
                <img src={shelterImg}/>

                <div className="information-block">
                    <div className="header-and-stars">
                        <h3>
                            Теремок заботы
                        </h3>
                        <Stars/>
                    </div>
                    <p className="description-shelter">
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                        Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                    </p>
                    <div>

                        <div className="additional-information">
                            <div className="place-shelter">
                                <Icon name={"map"} height={16} width={20}/>
                                <p>
                                    Высокогорный район, село Сая
                                </p>
                            </div>

                            <div>
                                <p>
                                    +7 (980) 888 55-55
                                </p>
                            </div>

                            <div>
                                <Icon name={"vk"} height={24} width={24}/>

                                <Icon name={"inst"} height={24} width={24}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <Footer/>
        </>

    )
}