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
                    <div className="modal w-[24rem] h-[30rem]">
                        <div className="modal-header">
                            <h4 className="titulo-h3 p-2">
                                { isEdit ? 'Editar': 'Agregar' } nota
                            </h4>
                            <Boton clases="boton-danger" onClick={onHide} icon="fa-solid fa-xmark"/>
                        </div>

                        <div className="modal-body">
                            {children}
                        </div>
                    </div> 
                    :
                    // Modal categoria
                    <div className="modal w-[24rem] h-[14rem]"> 
                        <div className="modal-header">
                            <h4 className="titulo-h3 p-2">
                                { isEdit ? 'Editar': 'Agregar' } categoria
                            </h4>
                            <Boton clases="boton-danger" onClick={onHide} icon="fa-solid fa-xmark"/>
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