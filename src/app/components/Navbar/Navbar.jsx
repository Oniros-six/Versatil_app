import React from "react";
import { Link } from 'react-router-dom';


const Navbar = (props) => {
    const {zona} = props
    return (
        <>
            <div className="nav">
                <h2 className="titulo-h2">
                    <Link to="#">Cerrar sesion</Link>
                </h2>
                
                <h1 className="titulo-h1">
                    {zona}
                </h1>
                <h2 className="titulo-h2">
                    {zona === 'Mis finanzas' ? <Link to="/">Notas</Link> : <Link to="/finanzas">Finanzas</Link>}
                </h2>
            </div>
        </>
    )
}
export default Navbar;