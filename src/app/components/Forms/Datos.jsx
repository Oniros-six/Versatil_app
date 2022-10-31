import React, {useEffect, useState} from 'react'
import Boton from '../Buttons/Boton'
import axios from 'axios'

const Datos = () => {

    const [datos, setDatos] = useState({})
    const user = "631ba9569f4fc6d8c5dc8171"
  
    const getSalario = async () => {
      try {
          const res = await axios.get(`api/users/${user}`)
          setDatos(res.data)
      }
  
      catch (error) {
          console.log(error);
      }
  }
  
  useEffect(() => {
    getSalario()
  }, [])
  
  console.log(datos)


    return (
        <div>
            <h3 className='titulo-h3 text-ambar'>
                Usuario:
            </h3>
            <div className='flex flex-row'>

                <div className='bg-zinc-300 p-2 rounded-md w-2/3'>
                    {datos.user}
                </div>

                <div className='ml-4'>
                    <Boton clases="boton-warning" icon="far fa-edit" />
                </div>

            </div>

            {/* .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.- */}
            <h3 className='titulo-h3 text-ambar'>
                Email:
            </h3>
            <div className='flex flex-row'>
                <div className='bg-zinc-300 p-2 rounded-md w-2/3'>
                    {datos.email}
                </div>
                <div className='ml-4'>
                    <Boton clases="boton-warning" icon="far fa-edit" />
                </div>
            </div>
            {/* .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.- */}
            <h3 className='titulo-h3 text-ambar'>
                Sueldo:
            </h3>
            <div className='flex flex-row'>
                <div className='bg-zinc-300 p-2 rounded-md w-2/3'>
                    {datos.sueldo}$
                </div>
                <div className='ml-4'>
                    <Boton clases="boton-warning" icon="far fa-edit" />
                </div>
            </div>
        </div>
    )
}

export default Datos