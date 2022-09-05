import Classroom from '../../../models/Classroom'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'DELETE'){

        /*
            { "_id" : ObjectId("5e8ca85cef4dcbee04fbbc12"), "software" : { "services" : [ "whatsapp", "twitter" ] } }

            db.demo541.update({ _id: ObjectId("5e8ca845ef4dcbee04fbbc11") },{ $pull: { 'software.services': "yahoo" }} );
        */

        try{
            // Teacher is Deleting Whole Class
            if(req.body.isTeacher){
                res.send({success: "Admin has deleted the class successfully"})
                await Users.findByIdAndRemove({_id: req.body.userID} ) // Deletes Entire User
            }
            
            // Class Member is Leaving Class
            else{
                // await Users.findByIdAndUpdate({_id: req.body.userID}, { $pull: { classesJoined: req.body.classID } })

                // await Classroom.findByIdAndUpdate({_id: req.body.classID}, { $pull: { classroomMembers: req.body.userID } })

                // const class = await Classroom.find({_id: req.body.classID}, { classroomMembers: req.body.userID })

                // const user = await Users.find( { _id: req.body.userID}, {classesJoined: req.body.classID } )
            }

        } catch (error) {
            // res.send({error: "Something went Wrong! Please try Again Later."})
            res.send(error.message)
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)