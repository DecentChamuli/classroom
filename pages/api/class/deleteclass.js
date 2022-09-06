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
                let removeClass = await Classroom.findOne({_id: req.body.classID})
                let allMembers = removeClass.classroomMembers
                allMembers.push(removeClass.classroomTeacher)

                await Classroom.findByIdAndRemove({_id: req.body.classID})

                allMembers.forEach(async member =>  {
                    // console.log(member)
                    await Users.updateOne({_id: member}, { $pull: {classesJoined: {classID: req.body.classID} } })
                });
                res.send({success: 'Class Deleted Successfully'})

            }

            // Class Member is Leaving Class
            else{
                await Users.updateOne({_id: req.body.userID}, { $pull: {classesJoined: {classID: req.body.classID} } })
                await Classroom.findByIdAndUpdate({_id: req.body.classID}, { $pull: { classroomMembers: req.body.userID } })
                res.send({success: 'You have left the class Successfully'})
            }

        } catch (error) {
            // res.send({error: "Something went Wrong! Please try Again Later."})
            res.status(404).json({error: error.message})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)