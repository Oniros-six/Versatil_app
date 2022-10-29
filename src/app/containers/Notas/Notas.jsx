import React, { useEffect, useState } from "react";
import axios from 'axios'

//Componentes

import Table from "../../components/Tables/Table";
import Boton from "../../components/Buttons/Boton";
import Modal from "../../components/Modals/Modal";
import FormNotas from "../../components/Forms/FormNotas"
import MenuNotas from "../../components/Menu/MenuNotas"

let notaInit = {
    id: "",
    note: "",
    date: "",
    status: false,
    category: ""
};

const Notas = ({cat}) => {
    // Hooks de Estado
    const [listaNotas, setListaNotas] = useState([]);
    const [notasData, setNotasData] = useState(notaInit);
    const [isEdit, setIsEdit] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [hasErrorInForm, setHasErrorInForm] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [show, setShow] = useState(false)
    const [id, setId] = useState()

    useEffect(() => {
        if (typeof(cat) !== typeof("")) {
          } else {
            getNotas(); 
          }
    }, [cat]);

    const normalizar = (note) => {
        const nota = note.trim().charAt(0).toUpperCase() + note.slice(1);
        return nota;
    }

    // ABML
    const getNotas = async () => {
        try {
            const notas = await axios.get(`api/notes/${cat}`);
            setListaNotas(notas.data);
            } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id, event) => {
        event.preventDefault();
        if (window.confirm('Estas seguro?')) {
            await deleteNota(id);
        }
    };

    const deleteNota = async (id) => {
        try {
            await axios.delete(`api/notes/${id}`);
            getNotas()
        } catch (error) {
            console.log(error);
        }
    };

    const addNota = async () => {
        notasData.category = cat
        try {
            const data = await axios.post(`api/notes/`, { notasData });
            getNotas()
            
        } catch (error) {
            console.log(error);
        }
        handleCloseModal();
    };

    const toggleNota = async (id) => {
        try {
            await axios.put(`api/notes/toggle/${id}`);
            getNotas()

        } catch (error) {
            console.log(error);
        }
        handleCloseModal();
    };

    const handleEdit = (nota, event) => {
        event.preventDefault();
        handleOpenModal(true, nota);
    };

    const editarNota = async () => {
        try {
            await axios.put(`api/notes/`, { notasData });
            getNotas()

        } catch (error) {
            console.log(error);
        }
        handleCloseModal();
    };

    const mostrarMenu = (value) => {
        setShow(!show)
        setId(value._id)
    } 
    // Modal
    
    const handleOpenModal = (isEdit = false, toEdit = null) => {
        setIsEdit(isEdit);
        if (isEdit) {
            setNotasData({
                id: toEdit._id,
                note: toEdit.note,
                date: toEdit.date,
            });
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setIsEdit(false);
        setHasErrorInForm(false);
        setNotasData(notaInit);
        setErrorMsg('');
    };

    // form
    const handleChangeInputForm = (property) => {
        property.target.value === '' ? setHasErrorInForm(true) : setHasErrorInForm(false);
        setNotasData({  ...notasData, [property.target.name]:property.target.value });
    };

    const handleSubmitForm = (e, form, isEdit) => {
        e.preventDefault();
        setHasErrorInForm(true);
        if (form.checkValidity()) isEdit ? editarNota(notasData.id) : addNota();
    };


    return (
        <>
             <div className="buttons-container">
                <Boton clases="boton rounded-md text-md py-1 px-2 w-16" secondicon="fas fa-arrow-right" icon="fa fa-plus mr-1" onClick={() => handleOpenModal()} /> 
            </div>

            <Table zona={"nota"} lista={listaNotas} >
               
                {Object.entries(listaNotas).map(([key, value]) => (
                    
                    <tr key={value._id} 
                    className="table-tr hover:bg-slate-300">
                        <td className={`${value.status !== false ? 'ready table-td nota' : ' table-td nota'}`}>                            
                            {value.note}
                        </td>
                        <td className={`${value.status !== false ? 'ready table-td fecha' : ' table-td fecha'}`}>
                            {value.date.slice(0,10)}
                        </td>
                        <td className="accion">
                            <div onClick={()=> mostrarMenu(value)}>
                                <h1 className="titulo-h3 text-ambar hover:cursor-pointer">. . .</h1>
                                {show && value._id === id? 
                                    <MenuNotas 
                                        value={value}
                                        toggleNota={toggleNota}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                        /> 
                                : 
                                    <></>}
                            </div>
                        </td>
                    </tr>

              ))}
            </Table>

            <Modal
                isEdit={isEdit}
                show={openModal}
                zona={"nota"}
                onHide={handleCloseModal}
            >
                <FormNotas
                    onHide={handleCloseModal}
                    isEdit={isEdit}
                    handleChanges={handleChangeInputForm}
                    notasData={notasData}
                    validated={hasErrorInForm}
                    handleSubmit={handleSubmitForm}
                    errorMsg={errorMsg}
                    normalizar={normalizar}
                    condicional = {true}
                />

            </Modal> 
        
        </>
    )
}
export default Notas