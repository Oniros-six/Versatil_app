import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
import {AppContext} from '../../Provider'

//Componentes

import Table from "../../components/Tables/Table";
import Boton from "../../components/Buttons/Boton";
import Modal from "../../components/Modals/Modal";
import FormCategoria from "../../components/Forms/FormCategoria";

let categoriaInit = {
    id:"",
    name: "",
    user: ""
};

const Categorias = () => {
    // Use contexts hooks
    const [idCat, setIdCat] = useContext(AppContext);
    // Hooks de Estado
    const [listaCategorias, setListaCategorias] = useState([]);
    const [categoriaData, setCategoriaData] = useState(categoriaInit);
    const [isEdit, setIsEdit] = useState(false);
    const [hasErrorInForm, setHasErrorInForm] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() =>  {
        getCategorias();
    }, []);

    const user = "62d87e206c8ab3c6a2325c5a";
    const normalizar = (name) => {
        const nombre = name.trim().charAt(0).toUpperCase() + name.slice(1);
        console.log(nombre)
        return nombre;
    }
    // ---------------------------------------- CATEGORIA ----------------------------------------
    // ABML

    const getCategorias = async () => {
        try {
            const categorias = await axios.get(`http://localhost:4000/api/categories/${user}`);
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
            await axios.delete(`http://localhost:4000/api/categories/${id}`);
            getCategorias()
        } catch (error) {
            console.log(error);
        }
    };

    const addCategoria = async () => {
        try {
            categoriaData.user = user
            const data = await axios.post(`http://localhost:4000/api/categories/`, { categoriaData });
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
            console.log(categoriaData)
            const data = await axios.put(`http://localhost:4000/api/categories/${categoriaData.id}`, { categoriaData });
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

    // form
    const handleChangeInputForm = (property) => {
        // Si el valor del input es vacío, entonces setea que hay un error
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
            <Table openModal={handleOpenModal} lista={listaCategorias}>

                {Object.entries(listaCategorias).map(([key, value]) => (
                    <tr key={value._id} className={`${value._id === idCat ? 'table-tr bg-sky-200 decoration' : 'table-tr hover:bg-zinc-300'}`}>
                        <td className="table-td categoria">
                            <Boton  nombre={value.name} onClick={() => setIdCat(value._id)}/>
                        </td>
                        <td className="accion-cat">
                            <Boton clases="boton-danger" icon="far fa-trash-alt" onClick={(event) => handleDelete(value._id, event)} />
                            <Boton clases="boton-warning" icon="far fa-edit" onClick={(event) => handleEdit(value, event)} />    
                        </td>
                    </tr>
                ))}
            </Table>

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