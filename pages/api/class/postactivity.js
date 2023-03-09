import Classroom from '../../../models/Classroom'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
  if (req.method == 'POST') {
    let activityData = {
      byUser: req.body.byUser,
      postMsg: req.body.postMsg
    }
    let classroomCode = { classroomCode: req.body.classroomCode }

    try {
      await Classroom.findOneAndUpdate(classroomCode, { $push: { classroomActivity: activityData } })
      res.send({ success: "Activity Posted Successfully" })

    } catch (error) {
      res.send({ error: "Something went Wrong! Please try Again Later." })
    }
  }
  else {
    res.status(404).json({ error: "Page Not Found" })
  }
}

export default connectDb(handler)