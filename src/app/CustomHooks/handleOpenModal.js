import { useState, useEffect } from "react";

const handleOpenModal = (editar = false, editData = null) => {
    const [Modal, setModal] = useState(false)
    
    setIsEdit(editar);
    if (editar) {
        setData({
            id: editData._id,
            user: editData.user,
            name: editData.name
        });
    }
    setModal(true)
    console.log("hola")
    return Modal
};

export default handleOpenModal;