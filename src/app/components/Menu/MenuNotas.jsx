import React from 'react'
import Boton from "../Buttons/Boton";

const MenuNotas = (props) => {
    const { value, toggleNota, handleEdit, handleDelete } = props;

    return (
        <div className='menuDropDown' >

            <ul className='flex'>
                <li className='dropDownLink'>
                    <Boton clases={`${value.status !== false ? 'boton-success' : 'boton-toggle'}`} icon={`${value.status !== false ? 'fa-solid fa-rotate-left' : 'fa-solid fa-check-double'}`} onClick={(event) => toggleNota(value._id, event)} />
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
export default MenuNotas;



