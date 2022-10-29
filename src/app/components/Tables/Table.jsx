import React from "react";
import Boton from "../Buttons/Boton";

const Table = (props) => {
    const {children, openModal, openNotasModal, lista, zona } = props;
    return (
            <table className={zona === "nota" ? "table-notas":"table"}>
                <thead className="table-thead">
                    <tr>
                        <th className="th">                      
                            {zona === "nota" ? 
                            <Boton nombre="Notas " clases="boton rounded-full text-sm py-1 px-2 " icon="fa fa-plus"  onClick={() => openNotasModal()} /> :
                            <Boton nombre="Categorias " clases="boton rounded-full text-sm py-1 px-2 " icon="fa fa-plus"  onClick={() => openModal()} />  }                         
                        </th>
                    </tr>
                    
                    {zona === "nota"?
                        <tr className="table-tr">
                            <th className="table-th nota">Nota</th>
                            <th className="table-th fecha">Fecha</th>
                            <th className="table-th accion">Acciones</th>
                        </tr>
                        :
                        <tr className="table-tr">
                            <th className="table-th categoria">Categoria</th>
                            <th className="table-th accion-cat">Acciones</th>
                        </tr>
                    }
                </thead>
                
                <tbody className="table-tbody scrollbar">
                    {lista.length !== 0 ? children : 
                    <tr className="flex flex-row justify-center">
                        <td>
                            <h4 className="titulo-h3">
                            {zona == "nota" ? 
                            "No tienes notas en esta categoria"
                            :
                            "No tienes ninguna categoria"}
                            </h4>
                        </td>
                    </tr>}
                </tbody>
            </table>
    )

}

export default Table

