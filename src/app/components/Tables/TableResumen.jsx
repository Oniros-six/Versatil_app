import React from "react";

const TableResumen = (props) => {
    const { listaItems, salario } = props;

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
            Diciebre: 0
        }
        if (listaItems.length !== 0) {
            for (let i = 0; i < listaItems.length; i++) {
                let month = listaItems[i].date.slice(5, 7)

                if (month === "01") {
                    if (!listaItems[i].paid) {
                        resumen.Enero += 0
                    } else {
                        resumen.Enero += listaItems[i].subTotal
                    }

                } else if (month === "02") {
                    if (!listaItems[i].paid) {
                        resumen.Febrero += 0
                    } else {
                        resumen.Febrero += listaItems[i].subTotal
                    }

                } else if (month === "03") {
                    if (!listaItems[i].paid) {
                        resumen.Marzo += 0
                    } else {
                        resumen.Marzo += listaItems[i].subTotal
                    }

                } else if (month === "04") {
                    if (!listaItems[i].paid) {
                        resumen.Abril += 0
                    } else {
                        resumen.Abril += listaItems[i].subTotal
                    }

                } else if (month === "05") {
                    if (!listaItems[i].paid) {
                        resumen.Mayo += 0
                    } else {
                        resumen.Mayo += listaItems[i].subTotal
                    }

                } else if (month === "06") {
                    if (!listaItems[i].paid) {
                        resumen.Junio += 0
                    } else {
                        resumen.Junio += listaItems[i].subTotal
                    }

                } else if (month === "07") {
                    if (!listaItems[i].paid) {
                        resumen.Julio += 0
                    } else {
                        resumen.Julio += listaItems[i].subTotal
                    }

                } else if (month === "08") {
                    if (!listaItems[i].paid) {
                        resumen.Agosto += 0
                    } else {
                        resumen.Agosto += listaItems[i].subTotal
                    }

                } else if (month === "09") {
                    if (!listaItems[i].paid) {
                        resumen.Septiembre += 0
                    } else {
                        resumen.Septiembre += listaItems[i].subTotal
                    }

                } else if (month === "10") {
                    if (!listaItems[i].paid) {
                        resumen.Octubre += 0
                    } else {
                        resumen.Octubre += listaItems[i].subTotal
                    }

                } else if (month === "11") {
                    if (!listaItems[i].paid) {
                        resumen.Noviembre += 0
                    } else {
                        resumen.Noviembre += listaItems[i].subTotal
                    }

                } else if (month === "12") {
                    if (!listaItems[i].paid) {
                        resumen.Diciebre += 0
                    } else {
                        resumen.Diciebre += listaItems[i].subTotal
                    }

                }
            }
        }
        return resumen
    }



    return (
        <table className="table w-3/12">
            <thead className="table-thead">
                <tr className="table-tr">
                    <th className="table-td costo text-left">Mes</th>
                    <th className="table-td text-right costo">Gastos</th>
                    <th className="table-td text-right costo">Ahorro</th>
                </tr>
            </thead>

            <tbody className="table-tbody">
                {listaItems === undefined ?
                    <tr className="flex flex-row justify-center">
                        <td>
                            <h4 className="titulo-h3">🤯</h4>
                        </td>
                    </tr>

                    :

                    Object.entries(resumen()).map(([key, value]) => (

                        <tr key={key} className="table-tr hover:bg-slate-300">
                            <td className="table-td costo text-left">
                                {key}
                            </td>
                            <td className="table-td costo text-right text-lime-600">
                                {value}$
                            </td>
                            <td className="table-td costo text-right text-lime-600">
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

