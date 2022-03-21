import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./app/components/header/Header";
import {Home} from "./app/pages/home/Home";
import {ShelterPage} from "./app/pages/shelter/ShelterPage";


const App = () => (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/shelters" element={<ShelterPage/>}/>
        </Routes>
    </BrowserRouter>
)

export default App;