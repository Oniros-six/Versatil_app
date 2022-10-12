import React, {useEffect, useState} from "react";
import Boton from "../Buttons/Boton";

const TableFinanzas = (props) => {
    const {openModal, listaItems, togglePaid, handleEdit, handleDelete, month, change, mes } = props;
    
    useEffect(() => {
        change(month)
    }, [month])

    const theMonth = (mes) => {
        switch (mes) {
            case 'Enero':
                return '01'
            case 'Febrero':
                return '02'
            case 'Marzo':
                return '03'
            case 'Abril':
                return '04'
            case 'Mayo':
                return '05'
            case 'Junio':
                return '06'
            case 'Julio':
                return '07'
            case 'Agosto':
                return '08'
            case 'Septiembre':
                return '09'
            case 'Octubre':
                return '10'
            case 'Noviembre':
                return '11'
            case 'Diciembre':
                return '12'
        }
    }


    return (
            <table className="table w-8/12">
                <thead className="table-thead">
                    <tr>
                        <th>
                            <Boton nombre="Nuevo item " clases="boton rounded-full text-sm py-1 px-2 " icon="fa fa-plus"  onClick={() => openModal()} />                     
                        </th>
                    </tr>
                    <tr className="table-tr">
                        <th className="table-td item">Item</th>
                        <th className="table-td unidades text-right">SubTotal</th>
                        <th className="table-td unidades text-right">Description</th>
                        <th className="table-td fecha">Fecha</th>
                        <th className="table-td acciones ml-2">Acciones</th>
                    </tr>
                </thead>
                
                <tbody className="table-tbody scrollbar">

                {listaItems === undefined ?
                        <tr className="flex flex-row justify-center">
                            <td>
                                <h4 className="titulo-h3">Aún no tienes gastos 🤯</h4>
                            </td>
                        </tr>
                        :

                        Object.entries(listaItems).filter((item) => item[1].date.slice(5,7) === theMonth(mes)).map(([key, value]) => (
                            
                            <tr key={value._id} className={`${value.paid !== false ? "table-tr hover:bg-slate-300 line-through text-[#a9a9a9]" : "table-tr hover:bg-slate-300"}`} >
                                <td className="table-td item">
                                    {value.item}
                                </td>
                    
                                <td className="table-td unidades text-right">
                                    {value.subTotal}$
                                </td>
                                <td className="table-td unidades text-right">
                                    {value.description}
                                </td>
                                <td className="table-td fecha">
                                    {value.date.slice(5,10)}
                                </td>
                                <td className="table-td acciones ml-4">
                                    <Boton  clases={`${value.paid !== false ? 'boton-success' : 'boton-toggle'}`} 
                                            icon={`${value.paid !== false ? 'fa-solid fa-rotate-left' : 'fa-solid fa-check-double'}`} 
                                            onClick={(event) => togglePaid(value._id, event)} 
                                        />    
                                    <Boton clases="boton-warning" icon="far fa-edit" onClick={(event) => handleEdit(value, event)} />  
                                    <Boton clases="boton-danger" icon="far fa-trash-alt" onClick={(event) => handleDelete(value._id, event)} />
                                </td>
                            </tr> 
                            ))
                    }
                </tbody>
            </table>
    )

}

export default TableFinanzas