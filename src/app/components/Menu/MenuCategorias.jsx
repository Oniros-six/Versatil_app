import React from 'react'
import Boton from "../Buttons/Boton";

const MenuCategorias = (props) => {
    const {value, handleEdit, handleDelete} = props;
    return (
        <div className = 'menuDropDown' >
            <ul>
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
export default MenuCategorias;


