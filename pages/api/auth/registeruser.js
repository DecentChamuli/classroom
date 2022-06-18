import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'
import bcrypt from 'bcryptjs'
import { registerValidation } from '../../../middleware/authValidation'

const handler = async (req, res) => {
    if(req.method == 'GET'){
        res.status(404).json({error: "Page Not Found"})
    }
    else if(req.method == 'POST'){

        // If Data in Valid
        const {error} = registerValidation(req.body)
        if(error) return res.send({error: error.details[0].message})

        // Checking if Email Already Exists
        const emailExist = await Users.findOne({email: req.body.email})
        if(emailExist) return res.send({error: 'Email Already Exists'})

        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        // Create New User
        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        try {
            // Save user to DB
            await user.save()
            res.send({success: `User saved Successfully. Id is ${user._id}`})
        } catch (error) {
            res.send({error})
        }

    }
}

export default connectDb(handler)