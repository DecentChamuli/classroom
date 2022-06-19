import { createContext, useState } from "react";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(false)

    return(
        <AuthContext.Provider value="Context Test 1221">
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext