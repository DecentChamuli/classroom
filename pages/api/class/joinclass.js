import Classroom from '../../../models/Classroom'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        try {
            // Checking if Entered Class Code is correct
            const classCode = await Classroom.findOne({classroomCode: req.body.classroomCode})
            if(!classCode) return res.send({error: 'Class Code is invalid.'})

            // Checking if User has already Joined Class of which Code is Entered
            const classExist = await Users.find( { _id: req.body.id, classesJoined: classCode._id } )
            if(classExist[0]) return res.send({error: "You're already a member of this Class"})
            
            // Adding Class to Logged In User's db
            await Users.findByIdAndUpdate({_id: req.body.id}, { $push: { classesJoined: classCode._id } })
            
            // Adding User Id to Class's Member DB
            await Classroom.findByIdAndUpdate({ _id: classCode._id }, { $push: { classroomMembers: req.body.id } })

            res.send({success: classCode.classroomSlug})
        } catch (error) {
            res.send({error: "Something went Wrong! Please try Again Later."})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)