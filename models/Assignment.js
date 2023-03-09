import mongoose from 'mongoose'

const assignmentSchema = new mongoose.Schema(
  {
    classID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
    },
    assignmentTitle: { type: String, required: true },
    assignmentDesc: { type: String, required: true },
    assignmentRefFiles: [{
      fileType: String,
      fileUrl: String
    }],
    assignmentSlug: { type: String, required: true },
    assignmentMarks: { type: Number, required: true },
    dueDate: { type: Date, required: true }
  }, { timestamps: true }
)

mongoose.models = {}

module.exports = mongoose.model('Assignment', assignmentSchema)