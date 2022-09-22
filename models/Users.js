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
            default: 'User',
        },
        classesJoined:[{
            classID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Classroom',
            },
            assignment: [{
                assignmentID: { type: String },
                submittedAt: { type: Date, default: () => Date.now() },
                submittedData: { type: String, required: true },
                obtainedMarks: { type: Number, default: 0},
                assignmentMarked: { type: Boolean, default: false}
            }]
        }],
    }, { timestamps: true }
)

mongoose.models = {}

module.exports = mongoose.model('User', userSchema)