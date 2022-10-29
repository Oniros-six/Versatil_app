import React, {useContext, useState, useEffect} from "react";
import {AppContext} from '../../Provider'

import Categorias from "../Categorias/Categorias";
import Notas from "../Notas/Notas";
import Navbar from "../../components/Navbar/Navbar"

const NotasYCategorias = () => {
    const [idCat, setIdCat] = useContext(AppContext);


    return(
        <>
        <Navbar zona={"Notas"} />
            <div className="tables-containers">
                <Categorias />
                <Notas cat={idCat}/>
            </div>  
        </>
    )
}

export default NotasYCategorias 