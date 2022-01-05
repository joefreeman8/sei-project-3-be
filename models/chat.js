import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
},{
  timestamps: true,
})

const chatSchema = new mongoose.Schema({
  messages: [messageSchema],
  userOne: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  userTwo: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

chatSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('Chat', chatSchema) 