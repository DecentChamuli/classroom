import Classroom from '../../../models/Classroom'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        try {
            // Checking if Class Exists
            const classSlug = await Classroom.findOne({classroomSlug: req.body.classroomSlug})
            if(!classSlug) return res.send({error: 'No Class Exists'})
            const classID = classSlug._id

            const user = await Users.findOne({_id: req.body.userID})
            
            // Checking if user is Logged In
            // if(!user) return res.send({error: 'Login to view Class'})
            // res.send({error: user})

            // Checking if User is Member of Class
            for(let i=0; i<user.classesJoined.length; i++){
                if(user.classesJoined[i].classID.toString() === classID.toString()){
                    return res.send({
                        success: "match at index: " + i,
                        // classInfo: classSlug,
                        classInfo: {
                            classroomCode: classSlug.classroomCode,
                            classroomName: classSlug.classroomName,
                            classroomDesc: classSlug.classroomDesc,
                            classroomMembers: classSlug.classroomMembers,
                            classroomTeacher: classSlug.classroomTeacher,
                            classroomActivity: classSlug.classroomActivity,
                        },
                        // classSlug.classroomAssignment, classSlug.classroomSlug,
                        // userInfo: user
                        userInfo: {name: user.name}
                    })
                }
            }
            res.send({error: 'You are not the member of the class'})
        } catch (error) {
            res.send({error: "Something went Wrong! Please try Again Later."})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)