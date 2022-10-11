import React from "react";
import { Link } from 'react-router-dom';


const Navbar = (props) => {
    const {zona} = props

    const tituloDerecho = (area) => {
        if (area === "Mis finanzas") {
            return <Link to="/">Mis notas</Link>
        } else if (area === "Incio de sesión") {
            return <Link to="/signup">Registrarme</Link>
        } else if (area === "Registro de usuario") {
            return <Link to="/Login">Inciar sesión</Link>
        } else {
            return <Link to="/finanzas">Mis finanzas</Link>
        }
    }

    return (
        <>
            <div className="nav">
            {(zona === "Mis finanzas" || zona === "Mis notas") ?
                <h2 className="titulo-h2">
                    <Link to="/logout">Cerrar sesión</Link>
                </h2>
                :
                <h2 className="titulo-h4">
                    Registrarte o inicia sesión <br />
                    para disfrutar la app
                </h2>
}
                <h1 className="titulo-h1">
                    {zona}
                </h1>
                
                <h2 className="titulo-h2">
                    {tituloDerecho(zona)}
                </h2>
            </div>
        </>
    )
}
export default Navbar;