import Classroom from '../../../models/Classroom'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        let flag = false
        let pointer
        try{
            const assignmentRes = await Classroom.findOne({ classroomSlug: req.body.classroomSlug })
            assignmentRes.classroomAssignment.forEach((assignment, index) => {
                if(assignment.taskSlug === req.body.taskSlug){
                    flag = true
                    pointer = index
                    return
                }
            })
            if(flag){
                res.send({success: assignmentRes.classroomAssignment[pointer]})
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