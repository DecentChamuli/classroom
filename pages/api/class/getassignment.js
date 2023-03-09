import Classroom from '../../../models/Classroom'
import Assignment from '../../../models/Assignment'
import Submission from '../../../models/Submission'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
  if (req.method == 'POST') {

    const { userID, classroomSlug, assignmentSlug } = req.body

    let hasSubmitted = false
    let hasSubmittedLate = false
    let submittedData = false
    try {

      const classInfo = await Classroom.findOne({ classroomSlug })
      const checkSubmission = await Submission.findOne({ userID, assignmentID: assignmentSlug })
      const assignmentInfo = await Assignment.findOne({ assignmentSlug })

      if(checkSubmission){
        hasSubmitted = true
        hasSubmittedLate = checkSubmission.submittedLate
        submittedData = checkSubmission.submittedData
      }

      res.send({
        success: 'success',
        teacherName: classInfo?.classroomTeacherName,
        teacherID: classInfo?.classroomTeacher,
        hasSubmitted,
        hasSubmittedLate,
        submittedData,
        assignmentDetails: assignmentInfo
      })
    } catch (error) {
      // res.send({ error: "Something went Wrong! Please try Again Later." })
      res.send({ error: error.message })
    }
  }
  else {
    res.status(404).json({ error: "Page Not Found" })
  }
}

export default connectDb(handler)