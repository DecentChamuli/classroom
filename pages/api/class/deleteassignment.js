import Classroom from '../../../models/Classroom'
import Submission from '../../../models/Submission'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
  if (req.method == 'POST') {
    try {
      // const classInfo = await Classroom.findOne({ classroomSlug: req.body.classroomSlug })

      await Submission.findOneAndDelete({ _id: req.body.assignmentID })
      res.send({ success: 'Assignment Unsubmitted Successfully' })

      /*
      Donot Delete This Whole Line... Separate Array
      // const user = await Users.aggregate([{$unwind: "$classesJoined"}])
      // const user = await Users.aggregate([
      //     { $unwind: "$classesJoined" },
      //     { $unwind: "$classesJoined.assignment" },
      //     { $match : { 'classesJoined.assignment.assignmentID' : req.body.taskSlug } },
      //     { $unset: 'classesJoined.assignment' }
      // ])
      */

      /*
      const user = await Users.updateOne(
          { _id: req.body.userID },
          { $pull: {"classesJoined.$[classesJoined].assignment": { assignmentID: req.body.taskSlug } } },
          { arrayFilters: [ {"classesJoined.classID" : classInfo._id} ] }
      )
      */


      /*
      Donot Delete Below Code.... Update Nested Document Values
      const user = await Users.updateOne({ _id: req.body.userID }, 
          { $set: {
              "classesJoined.$[updateClassesJoined].assignment.$[updateAssignment].obtainedMarks" : 0,
              "classesJoined.$[updateClassesJoined].assignment.$[updateAssignment].assignmentMarked" : false
          }}, 
          {
              "arrayFilters": [
              {"updateClassesJoined.classID" : classInfo._id},
              {"updateAssignment.assignmentID" : req.body.taskSlug}
          ]
      })
      */

    } catch (error) {
      res.send({ error: error.message })
      // res.send({error: "Something went Wrong! Please try Again Later."})
    }
  }
  else {
    res.status(404).json({ error: "Page Not Found" })
  }
}

export default connectDb(handler)