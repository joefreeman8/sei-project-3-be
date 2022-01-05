import { NotFound, Unauthorized } from '../lib/errors.js'
import User from '../models/user.js'


async function userIndex(_req, res, next) {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}


async function userShow(req, res, next) {
  const { userId } = req.params
  try {
    const userToShow = await User.findById(userId)
    if (!userToShow) { 
      throw new NotFound()
    }
    return res.status(200).json(userToShow)
  } catch (err) {
    next(err)
  }
}


async function userUpdate(req, res, next) {
  const { userId } = req.params
  const { currentUserId } = req
  try {
    const userToUpdate = await User.findById(userId)
    if (!userToUpdate) {
      throw new NotFound()
    }
    if (!userToUpdate._id.equals(currentUserId)) {
      throw new Unauthorized()
    }
    Object.assign(userToUpdate, req.body)
    await userToUpdate.save()
    return res.status(202).json(userToUpdate)
  } catch (err) {
    next(err)
  }
}

async function userDelete(req, res, next) {
  const { userId } = req.params
  const { currentUserId } = req
  try {
    const userToDelete = await User.findById(userId)
    if (!userToDelete) {
      throw new NotFound()
    }
    if (!userToDelete._id.equals(currentUserId)) {
      throw new Unauthorized()
    }
    await userToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

export default {
  index: userIndex,
  show: userShow,
  update: userUpdate,
  delete: userDelete,
}