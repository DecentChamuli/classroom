import Classroom from '../../../models/Classroom'
import Assignment from '../../../models/Assignment'
import connectDb from '../../../middleware/mongoose'
import { nanoid } from 'nanoid'

const handler = async (req, res) => {
  if (req.method == 'POST') {

    const { classroomSlug, assignmentTitle, assignmentDesc, assignmentMarks, dueDate } = req.body

    try {
      const classInfo = await Classroom.findOne({ classroomSlug: classroomSlug })

      const assignmentData = {
        classID: classInfo._id,
        assignmentTitle: assignmentTitle,
        assignmentDesc: assignmentDesc,
        assignmentMarks: assignmentMarks,
        /* assignmentRefFiles: [{
          fileType: String,
          fileUrl: String
        }], */
        assignmentSlug: nanoid(15),
        dueDate: dueDate
      }

      new Assignment(assignmentData).save()
      res.send({success: assignmentData.assignmentSlug})
    } catch (error) {
      res.send({ error: "Something went Wrong! Please try Again Later." })
    }
  }
  else {
    res.status(404).json({ error: "Page Not Found" })
  }
}

export default connectDb(handler)