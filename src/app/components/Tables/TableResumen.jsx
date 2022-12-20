import React, { useContext, useEffect } from "react";
import {AppContext} from '../../Provider'
import Boton from "../Buttons/Boton";

// INTENTANDO QUE SE PUEDA CAMBIAR EL ORDENAMIENTO SEGUN LOS DIFERENTES TIPOS, FECHA, GASTO O ITEM

const TableResumen = (props) => {
    const { listaItems, salario, mes, setActualizar, actualizar} = props;
    const [month, setMonth] = useContext(AppContext);

    const resumen = () => {

        let resumen = {
            Enero: 0,
            Febrero: 0,
            Marzo: 0,
            Abril: 0,
            Mayo: 0,
            Junio: 0,
            Julio: 0,
            Agosto: 0,
            Septiembre: 0,
            Octubre: 0,
            Noviembre: 0,
            Diciembre: 0
        }
        if (listaItems.length !== 0) {
            for (let i = 0; i < listaItems.length; i++) {
                let month = listaItems[i].date.slice(5, 7)

                if (month === "01") {
                    if (!listaItems[i].paid ) {
                        resumen.Enero += 0
                    } else if (listaItems[i].diferenciador) {
                        resumen.Enero -= listaItems[i].subTotal
                    } else if (!listaItems[i].diferenciador) {
                        resumen.Enero += listaItems[i].subTotal
                    }

                } else if (month === "02") {
                    if (!listaItems[i].paid ) {
                        resumen.Febrero += 0
                    } else if (listaItems[i].diferenciador) {
                        resumen.Febrero -= listaItems[i].subTotal
                    } else if (!listaItems[i].diferenciador) {
                        resumen.Febrero += listaItems[i].subTotal
                    }

                } else if (month === "03") {
                    if (!listaItems[i].paid ) {
                        resumen.Marzo += 0
                    } else if (listaItems[i].diferenciador) {
                        resumen.Marzo -= listaItems[i].subTotal
                    } else if (!listaItems[i].diferenciador) {
                        resumen.Marzo += listaItems[i].subTotal
                    }

                } else if (month === "04") {
                    if (!listaItems[i].paid ) {
                        resumen.Abril += 0
                    } else if (listaItems[i].diferenciador) {
                        resumen.Abril -= listaItems[i].subTotal
                    } else if (!listaItems[i].diferenciador) {
                        resumen.Abril += listaItems[i].subTotal
                    }

                } else if (month === "05") {
                    if (!listaItems[i].paid ) {
                        resumen.Mayo += 0
                    } else if (listaItems[i].diferenciador) {
                        resumen.Mayo -= listaItems[i].subTotal
                    } else if (!listaItems[i].diferenciador) {
                        resumen.Mayo += listaItems[i].subTotal
                    }

                } else if (month === "06") {
                    if (!listaItems[i].paid ) {
                        resumen.Junio += 0
                    } else if (listaItems[i].diferenciador) {
                        resumen.Junio -= listaItems[i].subTotal
                    } else if (!listaItems[i].diferenciador) {
                        resumen.Junio += listaItems[i].subTotal
                    }

                } else if (month === "07") {
                    if (!listaItems[i].paid ) {
                        resumen.Julio += 0
                    } else if (listaItems[i].diferenciador) {
                        resumen.Julio -= listaItems[i].subTotal
                    } else if (!listaItems[i].diferenciador) {
                        resumen.Julio += listaItems[i].subTotal
                    }

                } else if (month === "08") {
                    if (!listaItems[i].paid ) {
                        resumen.Agosto += 0
                    } else if (listaItems[i].diferenciador) {
                        resumen.Agosto -= listaItems[i].subTotal
                    } else if (!listaItems[i].diferenciador) {
                        resumen.Agosto += listaItems[i].subTotal
                    }

                } else if (month === "09") {
                    if (!listaItems[i].paid ) {
                        resumen.Septiembre += 0
                    } else if (listaItems[i].diferenciador) {
                        resumen.Septiembre -= listaItems[i].subTotal
                    } else if (!listaItems[i].diferenciador) {
                        resumen.Septiembre += listaItems[i].subTotal
                    }

                } else if (month === "10") {
                    if (!listaItems[i].paid ) {
                        resumen.Octubre += 0
                    } else if (listaItems[i].diferenciador) {
                        resumen.Octubre -= listaItems[i].subTotal
                    } else if (!listaItems[i].diferenciador) {
                        resumen.Octubre += listaItems[i].subTotal
                    }

                } else if (month === "11") {
                    if (!listaItems[i].paid ) {
                        resumen.Noviembre += 0
                    } else if (listaItems[i].diferenciador) {
                        resumen.Noviembre -= listaItems[i].subTotal
                    } else if (!listaItems[i].diferenciador) {
                        resumen.Noviembre += listaItems[i].subTotal
                    }

                } else if (month === "12") {
                    if (!listaItems[i].paid ) {
                        resumen.Diciembre += 0
                    } else if (listaItems[i].diferenciador) {
                        resumen.Diciembre -= listaItems[i].subTotal
                    } else if (!listaItems[i].diferenciador) {
                        resumen.Diciembre += listaItems[i].subTotal
                    }

                }
            }
        }
        return resumen
    }


    useEffect(() => {
        setActualizar(!actualizar)
    }, [month])


    const getMonthName = (number) => {
        return new Date('1999-' + number + '-15').toLocaleString('es-ES', { month: 'long' })
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    let mesStr = capitalizeFirstLetter(getMonthName(mes))
    return (
        <table className="table w-3/12">
            <thead className="table-thead">
                <tr className="table-tr">
                    <th className="table-th flex justify-self-start">Mes</th>
                    <th className="table-th flex justify-self-center ">Gastos</th>
                    <th className="table-th flex justify-self-end">Ahorro</th>
                </tr>
            </thead>

            <tbody className="table-tbody">
                {listaItems === undefined ?
                   <>Loading</>

                    :

                    Object.entries(resumen()).map(([key, value]) => (

                        <tr key={key} className={`${key === mesStr ? 'table-tr bg-zinc-300' : 'table-tr hover:bg-red-200'}`}>
                            <td className="flex w-1/3" >
                                <Boton clases={`${key === month ? 'hover:font-semibold font-bold' : 'hover:font-semibold'}`}  nombre={key} onClick={() => setMonth(key)}/>
                                
                            </td>
                            <td className="flex text-red-600 w-2/6">
                                {value}$
                            </td>
                            <td className="flex text-lime-600 w-1/6">
                                {value === 0 ? 0 : salario - value}$
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )

}

export default TableResumen

