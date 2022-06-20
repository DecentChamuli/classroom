import { createContext, useState, useEffect } from "react"
import Cookies from 'js-cookie'
import { verify } from 'jsonwebtoken'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const token = Cookies.get('authToken')
    let userID = token ? verify(token, 'mytokensecret32') : false

    // console.log(userID)
    
    return(
        <AuthContext.Provider value={{userID}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext