import Classroom from '../../../models/Classroom'
import connectDb from '../../../middleware/mongoose'
import { nanoid } from 'nanoid'

const handler = async (req, res) => {
    if(req.method == 'POST'){

        // Create New Class
        const classroom = new Classroom({
            classroomName: req.body.classroomName,
            classroomDesc: req.body.classroomDesc,
            classroomCode: await nanoid(8),
            classroomTeacher: req.body.classroomTeacher,
        })
        try {
            // Save user to DB
            await classroom.save()
            res.send({success: `Classroom has been successfully created. Class Code is ${classroom.classroomCode}`})
        } catch (error) {
            res.send({error})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)