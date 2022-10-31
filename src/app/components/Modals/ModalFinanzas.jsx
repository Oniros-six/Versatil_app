import React from "react";
import Boton from "../Buttons/Boton";

const ModalFinanzas = (props) => {
    const {show, isEdit, onHide, children} = props;
    const handleKeyDown = (e) => {
        if(e.keyCode === 27){
            onHide()
    }
}
    return (
        <>
            {show  &&
                <div className="modal-screen" onKeyDown={(event) =>handleKeyDown(event)}>
                    <div className="modal w-[24rem] h-[32rem]">
                        <div className="modal-header">
                            <h4 className="titulo-h3 p-2">
                                { isEdit ? 'Editar': 'Agregar' } item
                            </h4>
                            <Boton clases="boton-danger" onClick={onHide} icon="fa-solid fa-xmark"/>
                        </div>

                        <div className="modal-body">
                            {children}
                        </div>
                    </div> 
                </div>
            }
        </>
    )

}
export default ModalFinanzas;