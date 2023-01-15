import Users from '../../../models/Users'
import Token from '../../../models/Token'
import connectDb from '../../../middleware/mongoose'
import { randomBytes } from 'crypto'
import sendEmail from '../../../utils/sendEmail'

const handler = async (req, res) => {
    if(req.method == 'POST'){

        const { userEmail } = req.body

        const emailExist = await Users.findOne({email: userEmail})
        if(!emailExist) return res.send({error: "User with given Email doesn\'t exist"})

        try {
            let token = await Token.findOne({ userEmail })
            if(!token){
                token = new Token({
                    userEmail,
                    token: randomBytes(32).toString("hex")
                })
                await token.save()
            }
            let resetUrl = `${process.env.BASE_URL}/recover?password_reset=${token.token}&user_email=${userEmail}`
            await sendEmail(emailExist.name, userEmail, resetUrl, res)
        } catch (error) {
            res.status(401).send({error: error.message})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)