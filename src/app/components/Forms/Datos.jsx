import React, {useEffect, useState} from 'react'
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


    return (
        <div>
            <h3 className='titulo-h3 text-ambar'>
                Usuario:
            </h3>
            <div className='bg-zinc-300 p-2 rounded-md w-2/3'>
                {datos.user}
            </div>


            <h3 className='titulo-h3 text-ambar'>
                Email:
            </h3>
            <div className='bg-zinc-300 p-2 rounded-md w-2/3'>
                {datos.email}
            </div>

            <h3 className='titulo-h3 text-ambar'>
                Sueldo:
            </h3>
            <div className='bg-zinc-300 p-2 rounded-md w-2/3'>
                {datos.sueldo}$
            </div>

        </div>
    )
}

export default Datos
