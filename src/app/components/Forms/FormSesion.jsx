import React, { useRef } from "react";
// import Boton from "../../components/Buttons/Boton";

const FormSesion = (props) => {
    const formRef = useRef(null);
    const { userData,
            isLogin,
            handleChanges,
            validated,
            handleSubmit } = props;
    return (
        // noValidate validated={validated}
        <form  ref={formRef}>
            <div>
                <label>Usuario</label>
                <input
                    type="text"
                    placeholder="Ingresa tu usuario"
                    required={true}
                    value={userData.user}
                    name='user'
                    onChange={handleChanges} />
            </div>

            <form>
                <label>Contraseña</label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    required={true}
                    value={userData.password}
                    name='password'
                    onChange={handleChanges}
                />
            </form>

            <div>
                <input type="checkbox" label="Recuerdame" />
            </div>

            <Boton clases="boton" nombre="Enviar" onClick={(e) => handleSubmit(e, formRef.current, isLogin)} variant="success" />

        </form>
    );
}

export default FormSesion;