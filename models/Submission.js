import mongoose from 'mongoose'

const submissionSchema = new mongoose.Schema(
  {
    classID: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignmentID: { type: String, required: true }, // Slug of Assignment
    submittedData: { type: String, required: true },
    obtainedMarks: { type: Number, default: 0 },
    assignmentMarked: { type: Boolean, default: false },
    submittedAt: { type: Date, default: () => Date.now() },
    submittedLate: { type: Boolean, required: true },
  }
)

mongoose.models = {}

module.exports = mongoose.model('Submission', submissionSchema)