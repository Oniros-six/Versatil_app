import React from 'react'

const Menu = (props) => {
    const { area } = props;

    return (
        <>
        <div className = 'menuDropDown' >
            <ul>
                <li className='dropDownLink'>
                    <a href="/#/perfil">Mi perfil</a>
                </li>
                {area === "Notas" ? 
                    <li className='dropDownLink'>
                        <a href="/#/finanzas">Mis finanzas</a>
                    </li>
                    :
                    area === "Finanzas" ?
                    <li className='dropDownLink'>
                        <a href="/#">Mis notas</a>
                    </li>
                    :
                    area === "Mi perfil" ?
                    <>
                        <li className='dropDownLink'>
                            <a href="/#/finanzas">Mis finanzas</a>
                        </li>
                        
                        <li className='dropDownLink'>
                            <a href="/#">Mis notas</a>
                        </li>
                        
                    </>
                    :
                    <></>
                }
                <li className='dropDownLink'>
                    <a href="/logout">Cerrar sesión</a>
                </li>
            </ul>
        </div>

        </>
        
        
    )
}

export default Menu


