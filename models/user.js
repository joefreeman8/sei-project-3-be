import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
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

userSchema.set('toJSON', {
  transform(_doc, json) {
    delete json.password
    return json
  },
})

userSchema.virtual('passwordConfirmation').set(function (passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation
})

userSchema.pre('validate', function (next) {
  if (
    this.isModified('password') &&
    this.password !== this._passwordConfirmation
  ) {
    this.invalidate('passwordConfirmation', 'does not match')
  }
  next()
})

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}


userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('User', userSchema)