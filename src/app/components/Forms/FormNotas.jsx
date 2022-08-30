import React, { useRef } from "react";
import Boton from "../Buttons/Boton";


const FormNotas = (props) => {
    const formRef = useRef(null);
    const { onHide, isEdit, handleChanges, 
            notasData, handleSubmit, validated, normalizar } = props;
            let date = new Date();
            let output = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'));
    
    return (
        <form className="formulario"  ref={formRef}>
            <div className="form-input">
                <label className="label">
                    <h5 className="titulo-h5">
                        Nota
                    </h5>
                </label>

                <textarea 
                    className="textarea input"
                    autoCapitalize="true"
                    autoFocus
                    placeholder="Escribe la nota"
                    required={true}
                    value={normalizar(notasData.note)}  
                    name='note'
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
                    value={notasData.date || isEdit ? notasData.date.slice(0,10) : output}
                    name='date'
                    onChange={handleChanges}
                    />
            </div>

           <div className="form-botones">
                <Boton clases="boton-success"
                onClick={(e) => handleSubmit(e, formRef.current, isEdit)} 
                nombre={isEdit ? 'Editar' : 'Agregar'}
                />
                <Boton clases="boton-warning" 
                onClick={onHide}
                nombre="Cerrar"
                />
           </div>

        </form> 
    );

}

export default FormNotas;