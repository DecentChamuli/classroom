import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'
import cookie from 'cookie'
import { verify } from 'jsonwebtoken'

const handler = async (req, res) => {

  try {
    let cookies = cookie.parse(req.headers.cookie)
    let token = cookies.authToken
    let userID = verify(token, 'mytokensecret32')

    if(userID.role !== 'Admin'){
      return res.send({error: "You are not Allowed to Access this Route"})
    }
    let users = await Users.find()
    res.status(200).json({ users })

  } catch (error) {
    res.send({error: "You are not Allowed to Access this Route"})
  }


}

export default connectDb(handler)