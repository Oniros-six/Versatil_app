import React, { useRef } from "react";
import Boton from "../Buttons/Boton";

const FormFinanzas = (props) => {
    const formRef = useRef(null);
    const { onHide, isEdit, handleChanges,
        newItem, handleSubmit, normalizar } = props;

    let date = new Date();
    let output = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'));
    console.log( )
    return (
        <form className="formulario" ref={formRef}>

            <div className="form-input">
                <label className="label">
                    <h5 className="titulo-h5">
                        Item
                    </h5>
                </label>

                <input
                    className="input"
                    type="text"
                    autoFocus
                    autoCapitalize="true"
                    placeholder="Escribe el item"
                    required={true}
                    value={normalizar(newItem.item)}
                    name='item'
                    onChange={handleChanges}
                />

            </div>

            <div className="form-input">
                <label className="label">
                    <h5 className="titulo-h5">
                        Cantidad
                    </h5>
                </label>

                <input
                    className="input"
                    placeholder="Cuanto llevas?"
                    type="number"
                    min={1}
                    required={true}
                    value={newItem.quantity}
                    name='quantity'
                    onChange={handleChanges}
                />
            </div>

            <div className="form-input">
                <label className="label">
                    <h5 className="titulo-h5">
                        Costo
                    </h5>
                </label>

                <input
                    className="input"
                    placeholder="Cuanto vale?"
                    type="number"
                    min={1}
                    required={true}
                    value={newItem.cost}
                    name='cost'
                    onChange={handleChanges}
                />
            </div>

            <div className="form-input">
                <label className="label">
                    <h5 className="titulo-h5">
                        Fecha
                    </h5>
                </label>

                <input
                    className="input"
                    type="date"
                    required={false}
                    value={newItem.date || isEdit ? newItem.date.slice(0, 10) : output}
                    name='date'
                    onChange={handleChanges}
                />


            </div>
            <div className="form-botones">

                <Boton clases="boton-success"
                    nombre={isEdit ? 'Editar' : 'Agregar'}
                    onClick={(e) => handleSubmit(e, formRef.current, isEdit)}
                />
                <Boton clases="boton-warning"
                    nombre="Cerrar"
                    onClick={onHide}
                />
            </div>

        </form>

    );

}

export default FormFinanzas;    