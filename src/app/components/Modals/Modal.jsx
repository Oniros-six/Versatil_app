import React from "react";
import Boton from "../Buttons/Boton";

const Modal = (props) => {
    const {children, show, isEdit, onHide, zona} = props;

    const handleKeyDown = (e) => {
            if(e.keyCode === 27){
                onHide()
        }
    }

    return (
        <>
            {show  &&   
                <div className="modal-screen" onKeyDown={(event) =>handleKeyDown(event)}>
                    {zona === "nota"?

                    // Modal notas
                    <div className="modal-notas">
                        <div className="modal-header">
                            <h4 className="titulo-h4 p-2">
                                { isEdit ? 'Editar': 'Agregar' } nota
                            </h4>
                            <Boton clases="boton-danger rounded-full py-2 px-4 m-1 text-md" onClick={onHide} icon="fa-solid fa-xmark"/>
                        </div>

                        <div className="modal-body">
                            {children}
                        </div>
                    </div> 
                    :
                    // Modal categoria
                    <div className="modal"> 
                        <div className="modal-header">
                            <h4 className="titulo-h4 p-2">
                                { isEdit ? 'Editar': 'Agregar' } categoria
                            </h4>
                            <Boton clases="boton-danger rounded-full py-2 px-4 m-1 text-md" onClick={onHide} icon="fa-solid fa-xmark"/>
                        </div>

                        <div className="modal-body">
                            {children}
                        </div>
                    </div> 
                    }

                </div>
            }
        </>
    )

}
export default Modal;