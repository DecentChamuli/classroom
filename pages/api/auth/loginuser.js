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
        if(!validPassword) return res.send({error: 'Entered Password is Incorrect'})

        // Checking if User has Checked Remember Me
        let oneHour = 60 * 60
        let oneMonth = 60 * 60 * 24 * 30
        let tokenAge = req.body.rememberMeToken ? oneMonth : oneHour

        // Create and Assign JWT Token
        // const secretKey = process.env.TOKEN_SECRET
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now()/1000) + tokenAge,
                _id: user._id,
                name: user.name,
                role: user.role
            }, "mytokensecret32" 
        )
        
        // Saving Token in Cookies
        const serialised = serialize("authToken", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: tokenAge,
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