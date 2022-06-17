import { verify } from 'jsonwebtoken'

const adminValidation = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied')
    
    try {
        const verified = verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}

export default adminValidation