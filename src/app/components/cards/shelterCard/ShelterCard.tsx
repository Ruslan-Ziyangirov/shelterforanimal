import {FC} from "react";
import "./ShelterCard.sass";
import {Stars} from "../../stars/Stars";


interface Card{
    title:string;
    description:string;
    address: string;
    image:string;
}


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

export const ShelterCard:FC<Card> = ({title,description,address,image}) =>{
    return(
        <div className="card-wrapper">
            <div className="image-description">
                <img src={image} alt="Здесь должно быть фото милого животного :)"/>

                <div className="information-card">
                    <div className="header-card">
                        <h3>
                            {title}
                        </h3>
                        <Stars/>
                    </div>

                    <p>
                        {description}
                    </p>

                    <div className="address-wrapper">
                        <Icon name="map" height="16" width="16"/>

                        <p>{address}</p>
                    </div>
                </div>

                <div className="mobile-description">
                    <h3 className="mobile-title">
                        {title}
                    </h3>

                    <div className="arrow-go">
                        <Icon name="arrow-go" height="25" width="25"/>
                    </div>
                </div>
            </div>

        </div>
    )
}