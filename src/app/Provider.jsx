// Esto perfectamete podría ser molde, copy-paste
import React, {createContext, useState} from "react";

const Provider = ({children}) => {
    const [state, setState] = useState({});
    return(
        <div>
            <AppContext.Provider value={[state, setState]}>
                {children}
            </AppContext.Provider>
        </div>

    )
}

export default Provider;
export const AppContext = createContext();