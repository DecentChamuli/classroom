import Classroom from '../../../models/Classroom'
import Assignment from '../../../models/Assignment'
import Submission from '../../../models/Submission'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
  if (req.method == 'POST') {

    const { userID, classroomSlug, assignmentSlug, submittedData, submittedLate } = req.body

    try {
      const classInfo = await Classroom.findOne({ classroomSlug })
      if (!classInfo) return res.send({ error: "Classroom dont exists" })

      // if User is member of the class
      const classJoined = await Users.find({ _id: userID, "classesJoined.classID": classInfo._id })
      if (!classJoined.length) return res.send({ error: "You're already a member of this Class" })

      // if Assignment exists
      const checkAssignment = await Assignment.findOne({ classID: classInfo._id, assignmentSlug })
      if (!checkAssignment) return res.send({ error: "Assignment not Exists" })

      // if Assigment is already Submitted
      const checkSubmission = await Submission.findOne({ userID, assignmentID: assignmentSlug })
      if (checkSubmission) return res.send({ error: "Assignment Already Submitted" })

      // Submitting Assignment
      const submission = new Submission({
        classID: classInfo._id,
        userID,
        assignmentID: assignmentSlug,
        submittedData,
        submittedLate,
      })

      await submission.save()
      res.send({ success: "Assignment Submitted Successfully" })
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