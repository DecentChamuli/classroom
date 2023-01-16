import Users from '../../../models/Users'
import Token from '../../../models/Token'
import connectDb from '../../../middleware/mongoose'
import bcrypt from 'bcryptjs'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        const { userEmail, resetToken } = req.body

        const token = await Token.findOne({ userEmail, token: resetToken })
        if(!token) return res.status(404).send({error: "Reset Link has expired. Please request Password Reset again."})

        res.status(200).send({success: 'Token Verified'})
    }
    else if(req.method == 'PUT'){
        const { userEmail, newPassword, resetToken } = req.body
        try {
            const token = await Token.findOne({ userEmail, token: resetToken })
            if(!token) return res.status(404).send({error: "Reset Link has expired. Please request Password Reset again."})

            if(newPassword.length < 5) return res.status(400).send({error: "Password should be 5 characters long."})

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword, salt)

            await Users.findOneAndUpdate({ email: userEmail }, { password: hashedPassword })
            await Token.findOneAndDelete({ token: resetToken })

            res.status(200).send({success: "Password Successfully changed. You can now login with new Password"})
        } catch (error) {
            res.status(401).send({error: error.message})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)