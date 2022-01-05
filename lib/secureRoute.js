import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import Profile from '../models/profile'
import { Forbidden } from './errors.js'

export default async function secureRoute(req, _, next) {
  if (!req.headers.authorization) throw new Forbidden()

  const token = req.headers.authorization.replace('Bearer ', '')

  const payload = jwt.verify(token, secret)
  
  const profile = await Profile.findById(payload.sub)

  if (!profile) throw new Forbidden()

  req.currentUser = profile

  next()
}