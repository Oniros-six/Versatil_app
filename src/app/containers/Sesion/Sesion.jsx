import React, { useEffect, useState } from "react";
import axios from 'axios'

//Componentes
    // import FormSesion from "../../components/Forms/FormSesion";

let userInit = {
    user: "",
    password: ""
};

const Sesion = () => {
    //Hooks de estado
    const [userData, setUserData] = useState(userInit);
    const [user, setUser] = useState('')
    const [hasErrorInForm, setHasErrorInForm] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        prueba();
    }, []);

    const prueba =  async () => {
        try {
            const data = await axios.get(`http://localhost.localdomain:8080/prueba`);
            console.log(data.data)

        } catch (error) {
            console.log(error);
        }
    }

    const login = async () => {
        // console.log(userData)
        try {
            const data = await axios.post(`/`, { data: userData });
            setUser(userData.user);

        } catch (error) {
            console.log(error);
        }
    };

    const addUsuario = async () => {
        try {
            const data = await axios.post(`/signup`, { data: userData });
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };

    // const getCategorias = async (usuario) => {
    //     try {
    //         const categorias = await axios.get('https://peticiones.online/api/series');

    //         setListaCategorias(categorias.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const deleteCategoria = async (id) => {
    //     try {
    //         await axios.delete(`https://peticiones.online/api/series/${id}`);
    //         setListaCategorias(listaCategorias.filter((categoria) => categoria.id !== id));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };




    // const handleDelete = async (id, event) => {
    //     event.preventDefault();
    //     if (window.confirm('Estas seguro?')) {
    //         await deleteUser(id);
    //     }
    // };

    // form
    const handleChangeInputForm = (property) => {

        // Si el valor del input es vacío, entonces setea que hay un error
        property.target.value === '' ? setHasErrorInForm(true) : setHasErrorInForm(false);

        setUserData({ ...userData, [property.target.name]: property.target.value });
    };

    const handleSubmitForm = (e, form, isLogin) => {
        e.preventDefault();
        setHasErrorInForm(true);

        if (form.checkValidity()) isLogin ? login(userData) : addUsuario(userData.id);
    };

    return (
        <>
        {/* <FormSesion
            userData={userData}
            isLogin={isLogin}
            handleChanges={handleChangeInputForm}
            validated={hasErrorInForm}
            handleSubmit={handleSubmitForm}
        /> */}
        </>
    )
}

export default Sesion;
