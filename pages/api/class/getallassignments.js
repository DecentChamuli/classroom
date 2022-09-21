import Classroom from '../../../models/Classroom'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        try{
            const assignmentsRes = await Classroom.findOne({ classroomSlug: req.body.classroomSlug })
            res.send({success: assignmentsRes.classroomAssignment})
        } catch (error) {
            res.send({error: "Something went Wrong! Please try Again Later."})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)