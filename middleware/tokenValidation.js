import { verify } from 'jsonwebtoken'

const tokenValidation = (req, res, next) => {

    const { cookies } = req

    const token = cookies.authToken

    // const url = req.url

    if(!token) return res.send({error: 'Access Denied! You must login to access this route.'})
    
    try {
        const userID = verify(token, process.env.TOKEN_SECRET)

        console.log(userID)

        next()
    } catch (error) {
        res.status(400).send({error: 'Invalid Token'})
    }
}

export default tokenValidation