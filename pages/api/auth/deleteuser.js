import Users from '../../../models/Users'
import connectDb from '../../../middleware/mongoose'

const handler = async (req, res) => {
    if(req.method == 'GET'){
        res.status(404).json({error: "Page Not Found"})
    }
    else if(req.method == 'POST'){

        // Checking if Entered Email is Correct
        await Users.deleteOne({_id: req.body.id}, () => { 
            res.status(200).json({success: `User Deleted with ID: ${req.body.id}`})
        })
    }
}

export default connectDb(handler)