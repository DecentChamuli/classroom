import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
  let users = await Users.find()
  res.status(200).json({ users })
}

export default connectDb(handler)