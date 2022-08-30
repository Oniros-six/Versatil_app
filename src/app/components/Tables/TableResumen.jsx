import React from "react";

const TableResumen = (props) => {
    const {listaItems, salario} = props;
    
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
        if (listaItems.length !== 0 ) {
            for (let i=0; i < listaItems.length ; i++){
                let month = listaItems[i].date.slice(5,7)

                if (month === "01") {
                    resumen.Enero += listaItems[i].subTotal

                } else if (month === "02") {
                    resumen.Febrero += listaItems[i].subTotal

                }  else if (month === "03") {
                    resumen.Marzo += listaItems[i].subTotal

                }  else if (month === "04") {
                    resumen.Abril += listaItems[i].subTotal

                }   else if (month === "05") {
                    resumen.Mayo += listaItems[i].subTotal

                }   else if (month === "06") {
                    resumen.Junio += listaItems[i].subTotal

                }   else if (month === "07") {
                    resumen.Julio += listaItems[i].subTotal

                }   else if (month === "08") {
                    resumen.Agosto += listaItems[i].subTotal

                } else if (month === "09") {
                    resumen.Septiembre += listaItems[i].subTotal

                } else if (month === "10") {
                    resumen.Octubre += listaItems[i].subTotal
                    
                } else if (month === "11") {
                    resumen.Noviembre += listaItems[i].subTotal
                    
                } else if (month === "12") {
                    resumen.Diciebre += listaItems[i].subTotal
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
                        <th className="table-td text-right costo">Gasto</th>
                        <th className="table-td text-right costo">Resto</th>
                    </tr>
                </thead>
                
                <tbody className="table-tbody">
                    {listaItems === undefined ?
                        <tr className="flex flex-row justify-center">
                            <td>
                                <h4 className="titulo-h4">🤯</h4>
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
                                {salario - value}$ 
                            </td>
                        </tr>
                            ))
                    }
                </tbody>
            </table>
    )

}

export default TableResumen

