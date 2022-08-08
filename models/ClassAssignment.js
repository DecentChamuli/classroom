import mongoose from 'mongoose'

const classAssignmentSchema = new mongoose.Schema(
    {
        toDo: {
            type: String,
            required: true
        },
        assignedTo: {
            type: Array,
            default: [],required: true
        },
        submissionDone: {
            type: Array,
            default: [],
            byUser: {type: String, required: true},
            postMsg: {type: String, required: true},
            atDateTime: {type: Date, default: Date.now},
        },
        atDateTime: {
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