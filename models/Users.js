import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
        role:{
            type: String,
            default: 'User'
        },
        classesJoined:{
            type: Array,
            default: []
        },
    }, { timestamps: true }
)

mongoose.models = {}

module.exports = mongoose.model('User', userSchema)