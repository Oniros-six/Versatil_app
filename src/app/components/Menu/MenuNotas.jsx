import React from 'react'

const MenuNotas = () => {

    return (
        <>
            <div div className = 'menuDropDown' >
                <ul>
                    <li className='dropDownLink'>
                        <a href="/#">Mi perfil</a>
                    </li>
                    <li className='dropDownLink'>
                       
                        <a href="/#">Mis notas</a>
                        
                    </li>
                    <li className='dropDownLink'>
                        <a href="/logout">Cerrar sesión</a>
                    </li>
                </ul>
            </div>

        </>
    
    )
}
export default MenuNotas


