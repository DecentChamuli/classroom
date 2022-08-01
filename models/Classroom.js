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
            required: true,
            unique: true,
        },
        classroomSlug:{
            type: String,
            required: true,
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
        classroomActivity:[{
            byUser: {type: String, required: true},
            postMsg: {type: String, required: true},
            atDateTime: {type: Date, default: Date.now},
        }],
        classroomAssignment:[{
            toDo: {type: String, required: true},
            assignedTo: {type: Array, default: [], required: true},
            submissionDone: {type: Array, default: []},
            atDateTime: {type: Date, default: Date.now},
        }],
    }, { timestamps: true }
)

mongoose.models = {}

module.exports = mongoose.model('Classroom', classroomSchema)