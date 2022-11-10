import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './pages/signup';
import Questionario from './pages/questionario';
function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signup/>}/>
                <Route path='/questionario' element={<Questionario/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;