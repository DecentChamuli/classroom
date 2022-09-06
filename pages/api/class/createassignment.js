import Classroom from '../../../models/Classroom'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        let assignmentData = {
            taskTitle: req.body.taskTitle,
            taskDesc: req.body.taskDesc,
            taskMarks: req.body.taskMarks,
        }
        let classroomSlug = {classroomSlug: req.body.classroomSlug}

        // res.send([assignmentData, classroomSlug])
        /*
            classroomAssignment:[{
            taskTitle: { type: String, required: true },
            taskDesc: { type: String, default: "" },
            createdAt: { type: Date, default: () => Date.now() },
            dueDate: { type: Date, default: () => Date.now(), required: true },
        }]
        */

        try{
            await Classroom.findOneAndUpdate(classroomSlug, { $push: { classroomAssignment: assignmentData } })
            res.send({success: "Assignment Posted Successfully"})

        } catch (error) {
            res.send({error: "Something went Wrong! Please try Again Later."})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)