import React, { useRef } from "react";
import Boton from "../../components/Buttons/Boton";

const FormSesion = (props) => {
    const formRef = useRef(null);
    const { userData,
        handleChanges,
        handleSubmit } = props;
    return (
        // noValidate validated={validated}
        <div className="form-container">
            
        <form ref={formRef}>

            <div className="form-input-container">
                <label>Usuario</label>
                <input
                    type="text"
                    placeholder="Ingresa tu usuario"
                    required={true}
                    value={userData.user}
                    name='user'
                    onChange={handleChanges} />
            </div>

            <div className="form-input-container">
                <label>Contraseña</label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    required={true}
                    value={userData.password}
                    name='password'
                    onChange={handleChanges}
                />
            </div>

            <div>
                <input type="checkbox" label="Recuerdame" />
            </div>



            <Boton clases="boton" nombre="Enviar" onClick={(e) => handleSubmit(e, formRef.current, isLogin)} variant="success" />
        </form>
    </div>
    );
}

export default FormSesion;