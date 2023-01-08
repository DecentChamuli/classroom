import { createContext, useState, useEffect } from "react"
import Cookies from 'js-cookie'
import { verify } from 'jsonwebtoken'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [userID, setUserID] = useState(false)
    const [userName, setUserName] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [domReady, setDomReady] = useState(false)

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
        setDomReady(true)
        setPageLoading(false)
    }, [token, userID])
    
    return(
        <AuthContext.Provider value={{userID, userName, setUserID, pageLoading, domReady}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext