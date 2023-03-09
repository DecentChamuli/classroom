import Submission from '../../../models/Submission'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
  if (req.method == 'POST') {
    try {
      await Submission.findOneAndDelete({ assignmentID: req.body.assignmentID })
      res.send({ success: 'Assignment Unsubmitted Successfully' })
    } catch (error) {
      res.send({ error: "Something went Wrong! Please try Again Later." })
    }
  }
  else {
    res.status(404).json({ error: "Page Not Found" })
  }
}

export default connectDb(handler)