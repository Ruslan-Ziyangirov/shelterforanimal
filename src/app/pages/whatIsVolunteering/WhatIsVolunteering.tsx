import "./WhatIsVolnteering.sass"
import wiv from "../../../assets/wiv-top-content.png"
import first from "../../../svg-icons/01.svg"
import second from "../../../svg-icons/02.svg"
import sun from "../../../svg-icons/sun.svg"
import shine from "../../../svg-icons/shine.svg"

import {Footer} from "../../components/footer/Footer";


export const WhatIsVolunteering = () =>{
    return(
        <div className="volunteering-wrapper">
            <div className="top-content">
                <img src={wiv}/>
            </div>
            <div className="info-block-wrapper">
                <div className="initial-text">
                    <p>
                        Для одних помощь животным — это отличный способ избавиться от одиночества
                        и плохого настроения. Кто-то не может себе позволить завести питомца дома, а у кого-то
                        душа болит за бездомных животных и он просто не может оставаться в стороне
                        и не помогать. Как бы то ни было, волонтёрская деятельность —
                        это прекрасный вариант сделать более счастливым и себя, и братьев наших меньших
                    </p>
                </div>
                <div className="first-paragraph">
                    <img src={first}/>
                    <p className="first-text">
                        Самое главное, в чем нуждаются братья наши меньшие, – внимание. Этот вариант для тех, кто пока
                        не готов брать на себя ответственность посещать приют по расписанию или становиться опекуном
                        конкретной собаки или кошки.
                    </p>
                    <img src={sun}/>
                </div>
                <div className="second-paragraph">
                    <img src={shine} className="shine-svg"/>
                    <p className="second-text">
                        Неадаптированной кошке или собаке найти хозяина очень сложно, и контакт с животным является
                        очень важным аспектом его социализации: волонтёр помогает животному реабилитироваться, перестать
                        бояться, снова «полюбить жизнь» и начать доверять человеку,
                    </p>
                    <img src={second}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}