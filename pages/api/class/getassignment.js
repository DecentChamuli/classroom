import Classroom from '../../../models/Classroom'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        let flag = false
        let pointer
        let hasSubmitted = false
        let hasSubmittedLate = false
        let submittedData = false
        try{
            const classInfo = await Classroom.findOne({ classroomSlug: req.body.classroomSlug })
            const user = await Users.findOne({_id: req.body.userID})
            for(const c of user.classesJoined){
                if(c.classID.toString() === classInfo._id.toString()){
                    if(c.assignment.length){
                        for(const e of c.assignment){
                            if(req.body.taskSlug.toString() === e.assignmentID.toString()){
                                hasSubmitted = true
                                hasSubmittedLate = e.submittedLate
                                submittedData = e.submittedData
                                break
                            }
                        }
                    }
                }
            }
            classInfo.classroomAssignment.forEach((assignment, index) => {
                if(assignment.taskSlug === req.body.taskSlug){
                    flag = true
                    pointer = index
                    return
                }
            })
            if(flag){
                res.send({
                    success: `found at index ${pointer}`,
                    assignmentDetails: classInfo.classroomAssignment[pointer],
                    teacherName: classInfo.classroomTeacherName,
                    teacherID: classInfo.classroomTeacher,
                    hasSubmitted,
                    hasSubmittedLate,
                    submittedData
                })
                return
            }
            throw error
        } catch (error) {
            res.send({error: "Something went Wrong! Please try Again Later."})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)