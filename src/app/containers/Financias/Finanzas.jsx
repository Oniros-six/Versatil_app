import React, { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from "../../components/Navbar/Navbar";
import TableFinanzas from "../../components/Tables/TableFinanzas"
import TableResumen from "../../components/Tables/TableResumen";
import ModalFinanzas from "../../components/Modals/ModalFinanzas";
import FormFinanzas from "../../components/Forms/FormFinanzas";

const Finanzas = () => {

    let itemInit = {
        item: '',
        quantity: '',
        cost: '',
        subTotal: '',
        date: '',
        user_id: ''
    };

    let date = new Date();
    let month = String(String(date.getMonth() + 1).padStart(2, '0'))

    const theMonth = (mes) => {
        switch (mes) {
            case '01':
                return "Enero"
            case '02':
                return "Febrero"
            case '03':
                return "Marzo"
            case '04':
                return "Abril"
            case '05':
                return "Mayo"
            case '06':
                return "Junio"
            case '07':
                return "Julio"
            case '08':
                return "Agosto"
            case '09':
                return "Septiembre"
            case '10':
                return "Octubre"
            case '11':
                return "Noviembre"
            case '12':
                return "Diciembre"
        }
    }
    const meses = [
        {key: 1, value: month, text: theMonth(month) },
        {key: 2, value: '01', text: 'Enero' },
        {key: 3, value: '02', text: 'Febrero' },
        {key: 4, value: '03', text: 'Marzo' },
        {key: 5, value: '04', text: 'Abril' },
        {key: 6, value: '05', text: 'Mayo' },
        {key: 7, value: '06', text: 'Junio' },
        {key: 8, value: '07', text: 'Julio' },
        {key: 9, value: '08', text: 'Agosto' },
        {key: 10, value: '09', text: 'Septiembre' },
        {key: 11, value: '10', text: 'Octubre' },
        {key: 12, value: '11', text: 'Noviembre' },
        {key: 13, value: '12', text: 'Diciembre' }
    ];


    //VARIABLES
    let actualizar = false
    const baulaunch = 1500
    const reintegroInternet = 1000
    const reintegroGimnasio = 1200
    const salario = 32160 + baulaunch + reintegroGimnasio + reintegroInternet;
    const user = "62d882c3e29cfe16c401a85b"

    // Hooks
    const [listaItems, setListaItems] = useState([]);
    const [newItem, setNewItem] = useState(itemInit)
    const [openModal, setOpenModal] = useState(false)
    const [mes, setMes] = useState(meses[0].value);
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        getItems()
    }, [actualizar])

    const normalizar = (name) => {
        const nombre = name.trim().charAt(0).toUpperCase() + name.slice(1);
        return nombre;
    }

    // ABML

    const getItems = async () => {
        try {
            actualizar = !actualizar
            const res = await axios.get(`http://localhost:4000/api/finanzas/${user}`)
            setListaItems(res.data)
            console.log(mes)

        }

        catch (error) {
            console.log(error);
        }
    }

    const postItem = async () => {
        const item = {
            item: newItem.item,
            quantity: newItem.quantity,
            cost: newItem.cost,
            subTotal: (newItem.quantity * newItem.cost),
            date: newItem.date,
            user_id: user
        }

        try {
            const res = await axios.post(`http://localhost:4000/api/finanzas/`, { item })
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
            setNewItem(newItem.subTotal = newItem.quantity * newItem.cost)
            await axios.put(`http://localhost:4000/api/finanzas/`, newItem)
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
            await axios.delete(`http://localhost:4000/api/finanzas/${id}`)
            getItems()
        } catch (error) {
            console.log(error)
        }
    }

    const togglePaid = async (id) => {
        try {
            await axios.put(`http://localhost:4000/api/finanzas/toggle/${id}`)
            getItems()

        } catch (error) {
            console.log(error)
        }
    }

    const changeMonth = event => {
        setMes(event.target.value);
        getItems()
    };

    // MODAL
    const handleOpenModal = (editarItem = false, editData = null) => {
        setIsEdit(editarItem);
        if (editarItem) {
            setNewItem({
                _id: editData._id,
                item: editData.item,
                date: editData.date,
                paid: editData.paid,
                quantity: editData.quantity,
                cost: editData.cost,
                subTotal: editData.cost * editData.quantity
            });
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setIsEdit(false);
        setNewItem(itemInit)
    };

    // FORMS

    const handleChangeInputForm = (input) => {
        setNewItem({ ...newItem, [input.target.name]: input.target.value });
    };

    const handleSubmitForm = (e, form, isEdit) => {
        e.preventDefault();
        if (form.checkValidity()) isEdit ? putItem() : postItem();
    };


    return (
        <>
            <Navbar zona={"Mis finanzas"} />
            <div className="tables-containers">

                <TableFinanzas
                    changeMonth={changeMonth}
                    month={mes}
                    openModal={handleOpenModal}
                    togglePaid={togglePaid}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    listaItems={listaItems}
                />
                <TableResumen
                    listaItems={listaItems}
                    salario={salario}
                />
                 <div>
                    <div className="div-select">
                        <h3 className="titulo-h5  text-center ">MES</h3>
                        <select  onChange={changeMonth} className="select" >
                            {meses.map(mes => (
                                <option className="bg-zinc-300  font-bold" key={mes.key} value={mes.value}>
                                    {mes.text}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

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
                />

            </ModalFinanzas>

        </>
    )
}
export default Finanzas;