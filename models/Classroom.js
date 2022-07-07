import mongoose from 'mongoose'

const classroomSchema = new mongoose.Schema(
    {
        classroomName:{
            type: String,
            required: true,
        },
        classroomDesc:{
            type: String,
            default: ""
        },
        classroomCode:{
            type: String,
            reuired: true,
            unique: true,
        },
        classroomSlug:{
            type: String,
            reuired: true,
            unique: true,
        },
        classroomTeacher:{
            type: String,
            required: true,
        },
        classroomMembers:{
            type: Array,
            default: []
        },
        classroomActivity:{
            type: Array,
            default: []
        },
        classroomAssignment:{
            type: Array,
            default: []
        },
    }, { timestamps: true }
)

mongoose.models = {}

module.exports = mongoose.model('Classroom', classroomSchema)