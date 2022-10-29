import React from "react";

const Boton = (props) => {
    const {nombre, clases, icon, secondicon} = props;
    return (
        <button className={clases} {...props}>
            {nombre}
            <i className={icon}/>
            <i className={secondicon}/>
        </button>
        
    )

}

export default Boton;