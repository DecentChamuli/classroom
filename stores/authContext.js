import { createContext, useState, useEffect } from "react"
import Cookies from 'js-cookie'
import { verify } from 'jsonwebtoken'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [userID, setUserID] = useState(false)
    const [userName, setUserName] = useState(false)

    const token = Cookies.get('authToken')
    useEffect(() => {
        verify(token, 'mytokensecret32', (err, decoded) => {
            if(err){
                setUserID(false)
                Cookies.remove('authToken')
                return
            }
            else{
                setUserID(decoded._id)
                setUserName(decoded.name)
                return
            }
        })
    }, [token, userID])
    
    return(
        <AuthContext.Provider value={{userID, userName, setUserID}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext