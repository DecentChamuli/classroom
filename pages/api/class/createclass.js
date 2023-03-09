import Classroom from '../../../models/Classroom'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'
import { nanoid } from 'nanoid'

const handler = async (req, res) => {
  if (req.method == 'POST') {

    const { classroomName, classroomDesc, classroomTeacher, classroomTeacherName } = req.body

    // Create New Class
    const classroom = new Classroom({
      classroomName,
      classroomDesc,
      classroomCode: nanoid(8),
      classroomSlug: nanoid(15),
      classroomTeacher,
      classroomTeacherName,
    })
    try {
      // Save user to DB
      await classroom.save()

      // Adding the Class ID to Teacher Database
      await Users.findByIdAndUpdate({ _id: classroomTeacher }, { $push: { classesJoined: { classID: classroom._id } } })

      res.send({ success: classroom.classroomSlug })
    } catch (error) {
      res.send({ error })
    }
  }
  else {
    res.status(404).json({ error: "Page Not Found" })
  }
}

export default connectDb(handler)