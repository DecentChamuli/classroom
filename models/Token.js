import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true
  },
  createdAt: { type: Date, expires: '10m', default: Date.now }
})

mongoose.models = {}

module.exports = mongoose.model('Token', tokenSchema)