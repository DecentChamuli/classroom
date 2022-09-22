import Classroom from '../../../models/Classroom'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        let assignmentData = {
            assignmentID: req.body.taskSlug,
            submittedData: req.body.submittedData,
        }

        try{
            const classID = await Classroom.findOne({classroomSlug: req.body.classroomSlug})
            const user = await Users.findOne({_id: req.body.userID})
            for(const c of user.classesJoined){
                if(c.classID.toString() === classID._id.toString()){
                    if(c.assignment.length){
                        for(const e of c.assignment){
                            if(req.body.taskSlug.toString() === e.assignmentID.toString()){
                                res.send({error: "Assignment Already Submitted"})
                                return
                            }
                        }
                    }
                    c.assignment.push(assignmentData)
                    user.save()
                    res.send({success: "Assignment Submitted Successfully"})
                    return
                }
            }
            res.send({error: "Assignment Submission Failed. Try again later!"})
        } catch (error) {
            res.send({error: "Something went Wrong! Please try Again Later."})
            // res.send(error.message)
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)