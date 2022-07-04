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
            const classExist = await Users.find( { _id: req.body.id, classes: classCode._id } )
            if(classExist[0]) return res.send({error: "Class Already Joined"})
            
            // Adding Class to Logged In user's db info.
            await Users.findByIdAndUpdate({_id: req.body.id}, { $push: { classes: classCode._id } })            
            res.send({success: 'Class Joined Successfully'})

        } catch (error) {
            res.send({error: "Something went Wrong! Please try Again Later."})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)