import React from "react";
import { HashRouter, Route, Routes } from 'react-router-dom';
import Provider from '../Provider'


import NotasYCategorias from '../containers/NotasYCategorias/NotasYCategorias'
import Finanzas from "../containers/Finanzas/Finanzas";
import Perfil from "../containers/Perfil/Perfil";
import NotFound from '../components/NotFound'
import Sesion from "../containers/Sesion/Sesion";


class App extends React.Component {
    render() {
        return (
            <>
                <Provider>
                <HashRouter>
                        <Routes>
                            <Route exact path="/" element={<NotasYCategorias/>} />
                            <Route exact path="/finanzas" element={<Finanzas/>} />
                            <Route exact path="/login" element={<Sesion/>} />
                            <Route exact path="/perfil" element={<Perfil/>} />
                            <Route path="*" element={<NotFound/>} />
                        </Routes>
                    </HashRouter>
                </Provider>
            </>
        )
    }
}

export default App;

