import mongoose from 'mongoose'

const classAssignmentSchema = new mongoose.Schema(
    {
        ofClass:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Classroom"
        },
        taskTitle: {
            type: String,
            required: true
        },
        taskDesc: {
            type: String,
            default: ""
        },
        assignedTo: {
            type: Array,
            required: true
        },
        submissions: {
            default: [],
            type: Array,
            byUser: {type: String, required: true},
            taskTitle: {type: String, required: true},
            taskDesc: {type: String},
            submittedAt: {type: Date, default: Date.now},
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        dueDate: {
            type: Date,
            required: true
        },
    }, { timestamps: true }
)

mongoose.models = {}

module.exports = mongoose.model('ClassAssignment', classAssignmentSchema)