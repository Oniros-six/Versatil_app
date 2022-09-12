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

    useEffect(() => {
    }, []);

    // const login = async () => {
    //     // console.log(userData)
    //     try {
    //         await axios.get(`http://localhost:4000/api/auth/login`);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };



    // form
    // const handleChangeInputForm = (property) => {

    //     // Si el valor del input es vacío, entonces setea que hay un error
    //     property.target.value === '' ? setHasErrorInForm(true) : setHasErrorInForm(false);

    //     setUserData({ ...userData, [property.target.name]: property.target.value });
    // };

    // const handleSubmitForm = (e, form, isLogin) => {
    //     e.preventDefault();
    //     setHasErrorInForm(true);

    //     if (form.checkValidity()) isLogin ? login(userData) : addUsuario(userData.id);
    // };

    return (
        <>
            <h2>El login es aqui</h2>
        </>
    )
}

export default Sesion;
