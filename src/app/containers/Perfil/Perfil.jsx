import React, { useState, useEffect } from 'react'
import NavBar from '../../components/Navbar/Navbar'
import Datos from '../../components/Forms/Datos'
import axios from 'axios'

const Perfil = () => {

  return (
    <>
      <NavBar zona={"Mi perfil"} />
      <div className='flex flex-col items-center w-full h-full border-x-4 border-double border-red-800 rounded-full p-3 mt-6 '>
        <div className='flex flex-col items-center w-8/12 p-4 border-solid border-2 border-ambar rounded-md bg-slate-500 ' >
          <div className='bg-black w-8/12 p-4 rounded-md'>
            <h2 className='titulo-h2 text-ambar'>
              Datos
            </h2>
            <hr className='separador w-12/12 m-2 ml-6 ' />

            <div className='separadorVertical w-12/12 p-4'>
              <Datos />

              <hr className='separador w-12/12 my-6 ml-0' />

              <ul className='text-ambar'>
                <li className='p-1'>
                  <a className='hover:font-bold' href="#">Cambiar contraseña</a>
                </li>
                <li className='p-1'>
                  <label htmlFor="sesion">Mantener sesion?</label>
                  <input className='ml-2' type="checkbox" name="" id="sesion" />
                </li>
                <li className='p-1'>
                  <a className='hover:font-bold' href="#">Resetear finanzas</a>
                </li>
                <li className='p-1'>
                  <a className='hover:font-bold' href="#">Resetear notas</a>
                </li>
              </ul>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Perfil