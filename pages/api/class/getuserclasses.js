import Classroom from '../../../models/Classroom'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        try {
            const user = await Users.findOne({ _id: req.body.id })

            const classData = []
            if(user.classesJoined.length){
                for(let i=0; i<user.classesJoined.length; i++){
                    let classes = await Classroom.findOne({ _id: user.classesJoined[i].classID })
                    classData.push({
                        classroomName: classes.classroomName,
                        classroomSlug: classes.classroomSlug,
                        classroomCode: classes.classroomCode,
                        classroomTeacherID: classes.classroomTeacher,
                        classroomTeacherName: classes.classroomTeacherName
                    })
                }
            }
            res.send(classData)
        } catch (error) {
            res.send({error: "Something went wrong!"})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)