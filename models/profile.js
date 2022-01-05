import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  elevatorPitch: { type: String, required: true, maxlength: 140 },
  age: { type: Number, required: true },
  height: { type: Number },
  weight: { type: Number },
  bodyType: { type: String },
  animalType: { type: String, required: true },
  politicalView: { type: String },
  gender: { type: String },
  sexualOrientation: { type: String },
  lookingFor: [{ type: String, required: true }],
  human: { type: String },
  drinking: { type: Boolean },
  smoking: { type: Boolean },
  religion: { type: String },
  houseTrained: { type: Boolean },
  dietaryRequirements: [{ type: String }],
  children: { type: String },
})

profileSchema.plugin(mongooseUniqueValidator)

const Profile = mongoose.Model('Profile', profileSchema)

export default Profile