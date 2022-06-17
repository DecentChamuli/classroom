import Users from '../../models/Users'
import connectDb from '../../middleware/mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { loginValidation } from '../../middleware/authValidation'

const handler = async (req, res) => {
    if(req.method == 'GET'){
        res.status(404).json({error: "Page Not Found"})
    }
    else if(req.method == 'POST'){

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
        const token = jwt.sign
            ({
                exp: Math.floor(Date.now()/1000) + 60 * 60, // 1 Hour
                _id: user._id
            }, process.env.TOKEN_SECRET)
        res.setHeader('auth-token', token)
        res.status(200).send({success: 'Login Successful'})
    }
}

export default connectDb(handler)