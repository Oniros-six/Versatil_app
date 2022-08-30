import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Provider from '../Provider'


import NotasYCategorias from '../containers/NotasYCategorias/NotasYCategorias'
import Finanzas from "../containers/Financias/Finanzas";
import NotFound from '../components/NotFound'


class App extends React.Component {
    render() {
        return (
            <>
                <Provider>
                <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={<NotasYCategorias/>} />
                            <Route exact path="/finanzas" element={<Finanzas/>} />
                            <Route element={<NotFound/>} />
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </>
        )
    }
}

export default App;

