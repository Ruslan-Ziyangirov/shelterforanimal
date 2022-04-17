import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./app/components/header/Header";
import {Home} from "./app/pages/home/Home";
import {ShelterPage} from "./app/pages/shelters/ShelterPage";
import {Footer} from "./app/components/footer/Footer";
import {WhatIsVolunteering} from "./app/pages/whatIsVolunteering/WhatIsVolunteering";
import {News} from "./app/pages/news/News";
import {Profile} from "./app/pages/profile/Profile";
import {Shelter} from "./app/pages/shelter/Shelter";


const App = () => (
    <div>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/shelters" element={<ShelterPage/>}/>
            <Route path='/shelters/:id'  element={<Shelter/> }/>
            <Route path="/volunteering" element={<WhatIsVolunteering/>}/>
            <Route path="/news" element={<News/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
    </div>
)

export default App;