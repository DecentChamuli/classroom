import Classroom from '../../../models/Classroom'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        try {
            // Checking if Class Exists
            const classSlug = await Classroom.findOne({classroomSlug: req.body.classroomSlug})
            if(!classSlug) return res.status(404).send({error: 'Class Donot Exists'})
            
            // Checking if User is Member of Class
            const classID = classSlug._id
            const user = await Users.findOne({_id: req.body.userID})
            for(let i=0; i<user.classes.length; i++){
                if(user.classes[i].toString() === classID.toString()){
                    return res.send({
                        success: "match at index: " + i,
                        classInfo: classSlug,
                        userInfo: user
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