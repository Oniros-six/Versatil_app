import React from 'react'
import Boton from "../Buttons/Boton";

const MenuFinanzas = (props) => {
    const {value, togglePaid, handleEdit, handleDelete} = props;

    return (
        <div className = 'menuDropDown' >
                <ul>
                <li className='dropDownLink'>
                    <Boton  clases={`${value.paid !== false ? 'boton-success' : 'boton-toggle'}`} 
                                            icon={`${value.paid !== false ? 'fa-solid fa-rotate-left' : 'fa-solid fa-check-double'}`} 
                                            onClick={(event) => togglePaid(value._id, event)} 
                                        />  
                </li>
                <li className='dropDownLink'>
                    <Boton clases="boton-warning" icon="far fa-edit" onClick={(event) => handleEdit(value, event)} />  
                </li>
                <li className='dropDownLink'>
                    <Boton clases="boton-danger" icon="far fa-trash-alt" onClick={(event) => handleDelete(value._id, event)} /> 
                </li>
            </ul>
        </div>   
    )
}

export default MenuFinanzas  
