import { createContext, useState } from "react";
export const TeamC = createContext(null)


const Context = ({ children }) => {

    const MyID = 2;
    const [userLogin, setUserLogin] = useState(false);


    return (<TeamC.Provider value={{ MyID, userLogin, setUserLogin }}>
        {children}
    </TeamC.Provider>)
}

export default Context;