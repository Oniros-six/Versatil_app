import React, {useState} from "react";
import MenuFinanzas from "../Menu/MenuFinanzas"



const TableFinanzas = (props) => {
    const {listaItems, togglePaid, handleEdit, handleDelete, 
            mes, alternarOrden } = props;
    const [show, setShow] = useState(false)
    const [id, setId] = useState()

    const mostrarMenu = (value) => {
        setShow(!show)
        setId(value._id)
    } 

    return (
            <table className="table w-8/12">
                <thead className="table-thead">
                    <tr className="table-tr">
                        <th className="table-th item">
                            <button onClick= {(event) => alternarOrden(event, 'Item')}>
                                Item
                            </button>
                        </th>
                        <th className="table-th descripcion">Descripción</th>
                        <th className="table-th subtotal">
                            <button onClick={(event) => alternarOrden(event, 'Subtotal')}>
                                SubTotal
                            </button>
                        </th>
                        <th className="table-th fecha">
                            <button onClick={(event) => alternarOrden(event, 'Date')}>
                                Fecha
                            </button>
                        </th>
                        <th className="table-th acciones ">Acciones</th>
                    </tr>
                </thead>
                
                <tbody className="table-tbody scrollbar">

                {listaItems === undefined ?
                        <>
                        </>
                        :

                        Object.entries(listaItems).filter((item) => item[1].date.slice(5,7) === String(mes)).map(([key, value]) => (
                            
                            <tr key={value._id} className="table-tr hover:bg-slate-300" >

                                <td className={`${(value.diferenciador === false && value.paid === true) ? "table-td item ready" : "table-td item"}`}>
                                    {value.item}
                                </td>
                                
                                <td className={`${(value.diferenciador === false && value.paid === true)  ? "table-td descripcion ready" : "table-td descripcion"}`}>
                                    {value.description}
                                </td>

                                <td className={`${(value.diferenciador === true) ? "table-td subtotal text-lime-600" : (value.paid === true) ? "table-td subtotal ready text-red-600" : "table-td subtotal text-red-600"}`}>
                                    {(value.diferenciador === false )? `- ${value.subTotal} $` : `+ ${value.subTotal} $`}
                                </td>

                                <td className={`${(value.diferenciador === false && value.paid === true) ? "table-td fecha ready" : "table-td fecha"}`}>
                                    {value.date.slice(5,10)}
                                </td>

                                <td className="table-td acciones">
                                    <div onClick={()=> mostrarMenu(value)}>
                                            <h1 className="titulo-h3 text-ambar hover:cursor-pointer">. . .</h1>
                                        {show && value._id === id? 
                                            <MenuFinanzas
                                                value={value}
                                                togglePaid={togglePaid}
                                                handleEdit={handleEdit} 
                                                handleDelete={handleDelete}
                                                /> 
                                        : 
                                            <></>}
                                    </div>
                                </td>
                            </tr> 
                            ))
                    }
                </tbody>
            </table>
    )
}

export default TableFinanzas