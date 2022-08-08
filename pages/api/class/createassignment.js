import Classroom from '../../../models/Classroom'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        let assignmentData = {
            toDo: "aa",
            assignedTo: "aa",
            submissionDone: "aa",
            atDateTime: "aa",
            dueDate: "aa",
        }


        /*
            classroomAssignment:[{
            toDo: {type: String, required: true},
            assignedTo: {type: Array, default: [], required: true},
            submissionDone: {type: Array, default: []},
            atDateTime: {type: Date, default: Date.now},
            dueDate: {type: Date, required: true},
        */


        let classroomSlug = {classroomCode: req.body.classroomSlug}

        try{
            await Classroom.findOne(classroomSlug)
            res.send({success: "Assignment Created Successfully"})

        } catch (error) {
            res.send({error: "Something went Wrong! Please try Again Later."})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)