import Classroom from '../../../models/Classroom'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        try {
            const user = await Users.findOne({ _id: req.body.id })
            // user.classes // Array of Class ID 

            // const classData = [{length: user.classes.length}]
            const classData = []

            if(user.classes.length > 0){
                for(let i=0; i<user.classes.length; i++){
                    let classes = await Classroom.findOne({ _id: user.classes[i] })
                    classData.push(classes)
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