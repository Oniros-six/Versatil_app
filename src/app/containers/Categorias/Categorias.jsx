import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
import {AppContext} from '../../Provider'

//Componentes

import Table from "../../components/Tables/Table";
import Boton from "../../components/Buttons/Boton";
import Modal from "../../components/Modals/Modal";
import FormCategoria from "../../components/Forms/FormCategoria";
import MenuCategorias from "../../components/Menu/MenuCategorias"

let categoriaInit = {
    id:"",
    name: "",
    user: ""
};

const Categorias = (props) => {
    // Use contexts hooks
    const [idCat, setIdCat] = useContext(AppContext);
    // Hooks de Estado
    const [listaCategorias, setListaCategorias] = useState([]);
    const [categoriaData, setCategoriaData] = useState(categoriaInit);
    const [isEdit, setIsEdit] = useState(false);
    const [hasErrorInForm, setHasErrorInForm] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [show, setShow] = useState(false)
    const [id, setId] = useState()

    useEffect(() =>  {
        getCategorias();
    }, []);

    const user = "631ba9569f4fc6d8c5dc8171";
    const normalizar = (name) => {
        const nombre = name.trim().charAt(0).toUpperCase() + name.slice(1);
        return nombre;
    }
    // ---------------------------------------- CATEGORIA ----------------------------------------
    // ABML

    const getCategorias = async () => {
        try {
            const categorias = await axios.get(`api/categories/${user}`);
            setListaCategorias(categorias.data);
            setIdCat(categorias.data[0]._id)
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id, event) => {
        event.preventDefault();
        if (window.confirm('Estas seguro?')) {
            await deleteCategoria(id);
        }
    };

    const deleteCategoria = async (id) => {
        try {
            await axios.delete(`api/categories/${id}`);
            getCategorias()
        } catch (error) {
            console.log(error);
        }
    };

    const addCategoria = async () => {
        try {
            categoriaData.user = user
            const data = await axios.post(`api/categories/`, { categoriaData });
            getCategorias()
        } catch (error) {
            console.log(error);
        }
        handleCloseModal();
    };

    const handleEdit = (editData, event) => {
        event.preventDefault();
        handleOpenModal(true, editData);
    };

    const editarCategoria = async () => {
        try {
            const data = await axios.put(`api/categories/${categoriaData.id}`, { categoriaData });
            getCategorias()

        } catch (error) {
            console.log(error);
        }
        handleCloseModal();
    };

    // // Modal
    const handleOpenModal = (editarCategoria = false, editData = null) => {
        setIsEdit(editarCategoria);
        if (editarCategoria) {
            setCategoriaData({
                id: editData._id,
                user: editData.user,
                name: editData.name
            });
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setIsEdit(false);
        setHasErrorInForm(false);
        setCategoriaData(categoriaInit);
        setErrorMsg('');
    };

    const mostrarMenu = (value) => {
        setShow(!show)
        setId(value._id)
    } 

    // form
    const handleChangeInputForm = (property) => {
        // Si el valor del input es vac??o, entonces setea que hay un error
        property.target.value === '' ? setHasErrorInForm(true) : setHasErrorInForm(false);

        setCategoriaData({ ...categoriaData, [property.target.name]: property.target.value });
        console.log(categoriaData)
    };

    const handleSubmitForm = (e, form, isEdit) => {
        e.preventDefault();
        setHasErrorInForm(true);
        if (form.checkValidity()) isEdit ? editarCategoria(categoriaData.id) : addCategoria();
    };


    return (
        <>
            <Table lista={listaCategorias}>

                {Object.entries(listaCategorias).map(([key, value]) => (
                    <tr key={value._id} className={`${value._id === idCat ? 'table-tr bg-sky-200 decoration' : 'table-tr hover:bg-zinc-300'}`}>
                        <td className="table-td categoria">
                            <Boton  nombre={value.name} onClick={() => setIdCat(value._id)}/>
                        </td>
                        <td className="accion-cat">
                        <div onClick={()=> mostrarMenu(value)} onMouseLeave={() => setTimeout(() => {setShow(false)}, 500)}>
                                <h1 className={`${show === true && value._id === id ? 'hidden' : 'tres-puntos'}`}><i className="fas fa-caret-down"></i></h1>
                                {show && value._id === id? <>
                                    <MenuCategorias 
                                    value={value}
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                    /> 
                                </>
                                    : 
                                    <></>}
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>

                     
            <div className="buttons-container">
                <Boton clases="boton rounded-md text-md py-1 px-2 w-16" secondicon="fa fa-plus" icon="fas fa-arrow-left mr-1"  onClick={() => handleOpenModal()} />                        
            </div>
                    

            <Modal
                isEdit={isEdit}
                show={openModal}
                zona={"categoria"}
                onHide={handleCloseModal}
            >
                <FormCategoria
                    normalizar = {normalizar}
                    onHide={handleCloseModal}
                    isEdit={isEdit}
                    handleChanges={handleChangeInputForm}
                    categoriaData={categoriaData}
                    validated={hasErrorInForm}
                    handleSubmit={handleSubmitForm}
                    errorMsg={errorMsg}
                />

            </Modal>
        
        </>
    )
}
export default Categorias
