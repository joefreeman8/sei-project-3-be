import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import User from '../models/user'
import { Forbidden } from './errors.js'

export default async function secureRoute(req, _, next) {
  if (!req.headers.authorization) throw new Forbidden()

  const token = req.headers.authorization.replace('Bearer ', '')

  const payload = jwt.verify(token, secret)
  
  const profile = await User.findById(payload.sub)

  if (!profile) throw new Forbidden()

  req.currentUser = profile

  next()
}