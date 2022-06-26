import Classroom from '../../../models/Classroom'
import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'POST'){
        try {
            let user = await Users.findOne({ _id: req.body.id })
            user.classes // Array of Class ID 

            let arr = []

            for(let i=0; i<user.classes.length; i++){
                let classes = await Classroom.findOne({ _id: user.classes[i] })
                arr.push(classes)
            }
            res.send(arr)

        } catch (error) {
            res.send({error: "Something went wrong!"})
        }
    }
    else{
        res.status(404).json({error: "Page Not Found"})
    }
}

export default connectDb(handler)