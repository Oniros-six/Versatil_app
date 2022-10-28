import React, {useState} from "react";
import Menu from "../Menu/Menu";


const Navbar = (props) => {
    const {zona} = props
    const [show, setShow] = useState(false)

    return (
        <div>
            <div className="nav">
                <h1 className="titulo-h1 text-ambar hover:cursor-default">{zona}</h1>
                <div onClick={()=>setShow(!show)}>
                    <h1 className="titulo-h1 text-ambar hover:cursor-pointer border-solid border-b-2 border-ambar">Menú</h1>
                {show ? 
                    <Menu area={zona}/> 
                : 
                    <></>}
                </div>

                
            </div>
        </div>
    )
}
export default Navbar;