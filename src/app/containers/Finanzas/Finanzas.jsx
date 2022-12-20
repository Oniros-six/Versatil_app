import React, { useEffect, useState, useContext } from "react";
import { AppContext } from '../../Provider'
import axios from 'axios'
import Navbar from "../../components/Navbar/Navbar";
import TableFinanzas from "../../components/Tables/TableFinanzas"
import TableResumen from "../../components/Tables/TableResumen";
import ModalFinanzas from "../../components/Modals/ModalFinanzas";
import FormFinanzas from "../../components/Forms/FormFinanzas";
import Boton from "../../components/Buttons/Boton";
// 
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
    let mesActual = date.getMonth() + 1

     const getMonthNumber = (mes) => {
        if (mes === "Enero") {
         return '01'
        } else if (mes === "Febrero") {
         return '02'
        } else if (mes === "Marzo") {
         return '03'
        } else if (mes === "Abril") {
         return '04'
        } else if (mes === "Mayo") {
         return '05'
        } else if (mes === "Junio") {
         return '06'
        } else if (mes === "Julio") {
         return '07'
        } else if (mes === "Agosto") {
         return '08'
        } else if (mes === "Septiembre") {
         return '09'
        } else if (mes === "Octubre") {
         return '10'
        } else if (mes === "Noviembre") {
         return '11'
        } else if (mes === "Diciembre") {
         return '12'
        }
     }
    
     const normalizar = (name) => {
        const nombre = name.trim().charAt(0).toUpperCase() + name.slice(1);
        return nombre;
    }

    const nextPage = () => {
        if(listaItems.length >= limit){
            setSkip(skip + 15)
            setCounter(counter + 1)
        }
    }

    const previousPage = () => {
        if (skip !== 0) {
            setSkip(skip - 15)
            setCounter(counter - 1)
        }
        
    }

    const alternarOrden = (e,col) => {
        e.preventDefault()
        ascDesc ? setOrder('descending') : setOrder('ascending')
        console.log(ascDesc, order)
        setAscDesc(!ascDesc)
    } 



    //VARIABLES
    const user = "631ba9569f4fc6d8c5dc8171"

    // Hooks
    const [mes, setMes] = useState(mesActual)
    const [salario, setSalario] = useState(0)
    const [listaItems, setListaItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [newItem, setNewItem] = useState(itemInit)
    const [openModal, setOpenModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [ingreso, setIngreso] = useState(false)
    const [limit, setLimit] = useState(15);
    const [skip, setSkip] = useState(0);
    const [counter, setCounter] = useState(1);
    const [actualizar, setActualizar] = useState(false)
    const [order, setOrder] = useState('descending')
    const [ascDesc, setAscDesc] = useState(false)

    useEffect(() => {
        if (mes === undefined) {
            setMes(mesActual)
        } else {
            setMes(getMonthNumber(month))
        }            

        getItems()
        getAllItems()
        getSalario()
       
    }, [month, actualizar, skip])


    // ABML

    const getItems = async () => {
        try {   
            if (mes === undefined) {
                const res = await axios.get(`api/finanzas/${user}?skip=${skip}&limit=${limit}&month=${mesActual}&order=${order}`)
                setListaItems(res.data)

            } else {
                const res = await axios.get(`api/finanzas/${user}?skip=${skip}&limit=${limit}&month=${mes}&order=${order}`)
                setListaItems(res.data)
            }            
        }

        catch (error) {
            console.log(error);
        }
    }
    const getAllItems = async () => {
        try {
            const res = await axios.get(`api/finanzas/all/${user}`)
            setAllItems(res.data)
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
    }

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
        (form.checkValidity() && isEdit) ? putItem() : (ingreso) ? postNuevoIngreso() : postItem();
    };



    return (
        <>
            <Navbar zona={"Finanzas"} />
            <div className="tables-containers">

                <TableFinanzas
                    mes={mes}
                    togglePaid={togglePaid}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    listaItems={listaItems}
                    
                    alternarOrden={alternarOrden}
                />
                <div className="flex flex-col gap-2">
                    <div className="buttons-container">
                        <Boton clases="boton rounded-full text-md py-1 px-2 w-9 h-9 m-4" icon="fa fa-cash-register" onClick={() => handleOpenModal()} />
                        <Boton clases="boton rounded-full text-md py-1 px-2 w-9 h-9 m-4" icon="fas fa-hand-holding-usd" onClick={() => openModalIngreso()} />
                    </div>
                   <div  className="buttons-container  flex-col text-center">
                        <h4 className="titulo-h4">Paginas</h4>
                        <div className="buttons-container flex-row border-none">
                            <Boton clases="boton rounded-full text-md py-1 px-2 w-9 h-9 m-4" icon="fas fa-long-arrow-alt-left" onClick={() => previousPage()} />
                            <Boton clases="boton rounded-md text-md py-1 px-2 w-9 h-9 m-4" nombre={counter}/>
                            <Boton clases="boton rounded-full text-md py-1 px-2 w-9 h-9 m-4" icon="fa fa-long-arrow-alt-right" onClick={() => nextPage()} />

                        </div>
                   </div>
                </div>
                <TableResumen
                    setActualizar = {setActualizar}
                    actualizar = {actualizar}
                    listaItems={allItems}
                    salario={salario}
                    mes={mes}
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
                    ingreso={ingreso}
                />

            </ModalFinanzas>

        </>
    )
}
export default Finanzas;

