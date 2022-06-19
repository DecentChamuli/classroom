import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'
import { loginValidation } from '../../../middleware/authValidation'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

const handler = async (req, res) => {
    if(req.method == 'POST'){

       // If Data in Valid
        const {error} = loginValidation(req.body)
        if(error) return res.send({error: error.details[0].message})

        // Checking if Entered Email is Correct
        const user = await Users.findOne({email: req.body.email})
        if(!user) return res.send({error: 'Email not found'})

        // Checking if Entered Password is Correct
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.send({error: 'Wrong Password'})

        // Create and Assign JWT Token
        // const secretKey = process.env.TOKEN_SECRET
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now()/1000) + 60 * 60, // 1 Hour
                _id: user._id,
                 role: user.role,
            }, "mytokensecret32" 
        )
        // console.log(`Token is ${token}`)
        
        // Saving Token in Cookies
        const serialised = serialize("authToken", token, {
            httpOnly: false,
            // httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60, // 1 Hour
            path: "/"
        })
        res.setHeader('Set-Cookie', serialised)
        
        res.status(200).send({success: 'Login Successful'})
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)