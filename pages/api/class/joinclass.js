import Classroom from '../../../models/Classroom'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        try {
             // Checking if Entered Class Code is correct
            const code = await Classroom.findOne({classroomCode: req.body.classroomCode})
            if(!code) return res.send({error: 'Entered Code is Invalid'})

            // Adding Class to Logged In user's db info.
            // const user = await Users.findByIdAndUpdate({_id: req.body.id}, { classes: [code._id] })
            const user = await Users.findByIdAndUpdate({_id: req.body.id}, { $push: { classes: code._id } })

            // res.send({user})
            res.send({success: 'Done'})

            // res.send({success: `Class Code ${code._id} is valid`})

        } catch (error) {
            res.send({error: error})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)