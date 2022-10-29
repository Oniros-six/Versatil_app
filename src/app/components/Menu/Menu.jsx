import React from 'react'

const Menu = (props) => {
    const { area } = props;

    return (
        <>
        <div className = 'menuDropDown' >
            <ul>
                <li className='dropDownLink'>
                    <a href="/#">Mi perfil</a>
                </li>
                <li className='dropDownLink'>
                    {area === "Notas" ? 
                    <a href="/#/finanzas">Mis finanzas</a>
                    :
                    <a href="/#">Mis notas</a>
                    }
                </li>
                <li className='dropDownLink'>
                    <a href="/logout">Cerrar sesión</a>
                </li>
            </ul>
        </div>

        </>
        
        
    )
}

export default Menu


