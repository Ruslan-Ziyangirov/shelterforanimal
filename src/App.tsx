import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {Header} from "./app/components/header/Header";
import {Home} from "./app/pages/home/Home";
import {ShelterPage} from "./app/pages/shelters/ShelterPage";
import {Footer} from "./app/components/footer/Footer";
import {WhatIsVolunteering} from "./app/pages/whatIsVolunteering/WhatIsVolunteering";
import {News} from "./app/pages/news/News";
import {Profile} from "./app/pages/profile/Profile";
import {Shelter} from "./app/pages/shelter/Shelter";
import {ToastContainer} from "react-toastify";
import React from "react";
import { useTransition, animated } from 'react-spring'


const App = () => {
    const location = useLocation();

    const transitions = useTransition(location,
            location => location.pathname,
        {
                 from:{
                     opacity: 0,
                     transform: 'translateX(100%)',
                 },

                 enter:{
                     opacity: 1,
                     transform: 'translateX(0%)',
                 },

                 leave: {
                     opacity: 0,
                     transform: 'translateX(-100%)',
                 }
              });

    return(
        <div>
            <ToastContainer/>
            <div style={{position:"relative"}}>
                <Header/>
                {
                    transitions.map(({ item, props, key }) => (
                        <animated.div key={key} style={props}>
                            <div style={{position: 'absolute', width: '100%'}}>
                                <Routes location={item}>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path="/shelters" element={<ShelterPage/>}/>
                                    <Route path='/shelters/:id' element={<Shelter/>}/>
                                    <Route path="/volunteering" element={<WhatIsVolunteering/>}/>
                                    <Route path="/news" element={<News/>}/>
                                    <Route path="/profile" element={<Profile/>}/>
                                </Routes>
                            </div>
                        </animated.div>
                    ))}
            </div>
        </div>
    )
}

export default App;