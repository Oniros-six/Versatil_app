import React, { useRef } from "react";
import Boton from "../Buttons/Boton";


const FormCategoria = (props) => {
    const formRef = useRef(null);
    const { onHide, isEdit, handleChanges, categoriaData,
        validated, handleSubmit, normalizar } = props;
    return (
        <form className="formulario"  ref={formRef}>
            <div className="form-input">
                <label className="label">
                    <h5 className="titulo-h4">
                        Nombre
                    </h5>
                </label>
                <input
                    className="input"
                    type="text" 
                    autoFocus
                    autoCapitalize="true"
                    placeholder="Nombre de la categoria"
                    required={true}
                    value={normalizar(categoriaData.name)}
                    name='name'
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

export default FormCategoria;