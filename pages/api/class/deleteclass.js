import Classroom from '../../../models/Classroom'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        /*
            { "_id" : ObjectId("5e8ca85cef4dcbee04fbbc12"), "software" : { "services" : [ "whatsapp", "twitter" ] } }

            db.demo541.update({ _id: ObjectId("5e8ca845ef4dcbee04fbbc11") },{ $pull: { 'software.services': "yahoo" }} );
        */

        try{
            // Teacher is Deleting Whole
            if(req.body.isTeacher){
                res.send({success: "ADDD DDDsClass Deleted Successfully"})
                await Users.findByIdAndRemove({_id: req.body.userID} ) // Deletes Entire User
            }
            // Class Member is Leaving Class
            else{
                let del = await Users.findByIdAndUpdate({_id: req.body.userID}, { $pull: { classes: req.body.classID } })
                // let del = await Users.findByIdAndUpdate({_id: req.body.userID}, { $push: { classes: req.body.classID } })
                

                // await Classroom.findByIdAndUpdate({_id: req.body.classID}, { $pull: { classroomMembers: req.body.userID } })
                // await Classroom.findByIdAndUpdate({_id: req.body.classID}, { $push: { classroomMembers: req.body.userID } })
                
                
                // const classExist = await Users.find( { _id: req.body.userID}, {classes: req.body.classID } )
                // const classExist = await Classroom.find({_id: req.body.classID}, { classroomMembers: req.body.userID })

                // res.send({success: "Class Removed Successfully"})
                res.send(del)
                // res.send(classExist)
            }

        } catch (error) {
            res.send({error: "Something went Wrong! Please try Again Later."})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)