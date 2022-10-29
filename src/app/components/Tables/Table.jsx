import React from "react";

const Table = (props) => {
    const {children, lista, zona } = props;
    return (
            <table className={zona === "nota" ? "table-notas":"table"}>
                <thead className="table-thead"> 
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

