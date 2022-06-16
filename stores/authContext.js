import { createContext } from "react";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    return(
        <AuthContext.Provider value="Context Test 1221">
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext