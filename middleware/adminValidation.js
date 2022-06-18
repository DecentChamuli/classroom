import { verify } from 'jsonwebtoken'

const adminValidation = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.send({error: 'Access Denied'})
    
    try {
        const verified = verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).send({error: 'Invalid Token'})
    }
}

export default adminValidation