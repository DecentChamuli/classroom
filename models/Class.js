import mongoose from 'mongoose'

const classSchema = new mongoose.Schema(
    {
        className:{
            type: String,
            required: true,
        },
        classDesc:{
            type: String,
            default: ""
        },
        classCode:{
            type: String,
            reuired: true,
            unique: true,
        },
        classTeacher:{
            type: String,
            required: true,
        },
    }, { timestamps: true }
)

mongoose.models = {}

module.exports = mongoose.model('Class', classSchema)