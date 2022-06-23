import { createContext } from "react"
import Cookies from 'js-cookie'
import { verify } from 'jsonwebtoken'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const token = Cookies.get('authToken')
    let userID = verify(token, 'mytokensecret32', (err, decoded) => {
        if(err){
            return false
        }
        else if(decoded){
            return decoded._id
        }
        else{
            return false
        }
    })


    // let userID =  token ? verify(token, 'mytokensecret32') : false

    // console.log(userID)
    
    return(
        <AuthContext.Provider value={{userID}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext