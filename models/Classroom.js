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
            default: [],
        },
        classroomActivity:[{
            byUser: {type: String, required: true},
            postMsg: {type: String, required: true},
            postedAt: {type: Date, default: () => Date.now()},
        }],
        classroomAssignment:[{
            taskTitle: { type: String, required: true },
            taskDesc: { type: String, required: true },
            taskMarks: { type: Number, required: true },
            createdAt: { type: Date, default: () => Date.now() },
            dueDate: { type: Date, required: true }
        }]
    }, { timestamps: true }
)

mongoose.models = {}

module.exports = mongoose.model('Classroom', classroomSchema)