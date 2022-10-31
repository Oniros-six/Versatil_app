import React, { useEffect, useState, useContext } from "react";
import {AppContext} from '../../Provider'
import axios from 'axios'
import Navbar from "../../components/Navbar/Navbar";
import TableFinanzas from "../../components/Tables/TableFinanzas"
import TableResumen from "../../components/Tables/TableResumen";
import ModalFinanzas from "../../components/Modals/ModalFinanzas";
import FormFinanzas from "../../components/Forms/FormFinanzas";
import Boton from "../../components/Buttons/Boton";

const Finanzas = () => {
    const [month, setMonth] = useContext(AppContext);

    let itemInit = {
        item: '',
        diferenciador: false,
        subTotal: '',
        description: '',
        date: '',
        user_id: ''
    };

    let date = new Date()

    const getMonthName = (number) => {
        return new Date('1999-' + number + '-15').toLocaleString('es-ES', { month: 'long' })
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    let mesActual = capitalizeFirstLetter(getMonthName(date.getMonth() + 1))

    //VARIABLES
    let actualizar = false
    const user = "631ba9569f4fc6d8c5dc8171"

    // Hooks
    const [mes, setMes] = useState('')
    const [salario, setSalario] = useState(0)
    const [listaItems, setListaItems] = useState([]);
    const [newItem, setNewItem] = useState(itemInit)
    const [openModal, setOpenModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [ingreso, setIngreso] = useState(false)

    useEffect(() => {
        getItems()
        getSalario()
    }, [actualizar])

    const normalizar = (name) => {
        const nombre = name.trim().charAt(0).toUpperCase() + name.slice(1);
        return nombre;
    }

    // ABML

    const getItems = async () => {
        try {
            if (mes === '') {
                setMes(mesActual)
            }
            actualizar = !actualizar
            const res = await axios.get(`api/finanzas/${user}`)
            setListaItems(res.data)
        }

        catch (error) {
            console.log(error);
        }
    }
    const getSalario = async () => {
        try {
            const res = await axios.get(`api/users/${user}`)
            setSalario(res.data.sueldo)
        }

        catch (error) {
            console.log(error);
        }
    }

    const postItem = async () => {
        const item = {
            item: newItem.item,
            subTotal: newItem.subTotal,
            description: newItem.description,
            date: newItem.date,
            user_id: user
        }
        

        try {
            const res = await axios.post(`api/finanzas/`, { item })
            getItems()
        } catch (error) {
            console.log(error)
        }
        handleCloseModal();
    }

    const postNuevoIngreso = async () => {
        const item = {
            item: newItem.item,
            diferenciador: true,
            subTotal: newItem.subTotal,
            description: newItem.description,
            date: newItem.date,
            user_id: user
        }   
        try {
            const res = await axios.post(`api/finanzas/ingreso`, { item })
            getItems()
        } catch (error) {
            console.log(error)
        }
        handleCloseModal();
    }
    
    const handleEdit = (editData, event) => {
        event.preventDefault();
        handleOpenModal(true, editData);
    };

    const putItem = async () => {
        try {
            await axios.put(`api/finanzas/`, newItem)
            getItems()
        } catch (error) {
            console.log(error)
        }
        handleCloseModal();
    }

    const handleDelete = async (id, event) => {
        event.preventDefault();
        if (window.confirm('Estas seguro?')) {
            await deleteItem(id);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`api/finanzas/${id}`)
            getItems()
        } catch (error) {
            console.log(error)
        }
    }

    const togglePaid = async (id) => {

        try {
            await axios.put(`api/finanzas/toggle/${id}`)
            getItems()

        } catch (error) {
            console.log(error)
        }
    }

    const changeMonth = (mes) => {
        setMes(mes)
        getItems()
    };

    // MODAL
    
    const openModalIngreso = () => {
        setIngreso(true)
        setOpenModal(true)
    }

    const handleOpenModal = (editarItem = false, editData = null) => {
        setIsEdit(editarItem);

        if (editarItem) {
            setNewItem({
                _id: editData._id,
                item: editData.item,
                description: editData.description,
                date: editData.date,
                paid: editData.paid,
                subTotal: editData.subTotal
            });
        }
        setOpenModal(true);
        
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setIsEdit(false);
        setIngreso(false)
        setNewItem(itemInit)
    };

    // FORMS

    const handleChangeInputForm = (input) => {
        setNewItem({ ...newItem, [input.target.name]: input.target.value });
    };

    const handleSubmitForm = (e, form, isEdit, ingreso) => {
        e.preventDefault();
        (form.checkValidity() && isEdit) ? putItem() : (ingreso) ? postNuevoIngreso(): postItem();
    };

    

    return (
        <>
            <Navbar zona={"Finanzas"} />
            <div className="tables-containers">

                <TableFinanzas
                    change = {changeMonth}
                    mes = {mes}
                    month={month}
                    togglePaid={togglePaid}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    listaItems={listaItems}
                />
                <div className="buttons-container">
                   <Boton clases="boton rounded-full text-md py-1 px-2 w-9 h-9 m-4" icon="fa fa-cash-register"  onClick={() => handleOpenModal()} />                     
                   <Boton clases="boton rounded-full text-md py-1 px-2 w-9 h-9 m-4" icon="fas fa-hand-holding-usd"  onClick={() => openModalIngreso()} />      
                </div>
                <TableResumen
                    listaItems={listaItems}
                    salario={salario}
                    mes = {mes}
                />

            </div>

            <ModalFinanzas
                isEdit={isEdit}
                show={openModal}
                onHide={handleCloseModal}
                newItem={newItem}
            >
                <FormFinanzas
                    normalizar={normalizar}
                    onHide={handleCloseModal}
                    isEdit={isEdit}
                    handleChanges={handleChangeInputForm}
                    newItem={newItem}
                    handleSubmit={handleSubmitForm}
                    ingreso = {ingreso}
                />

            </ModalFinanzas>

        </>
    )
}
export default Finanzas;