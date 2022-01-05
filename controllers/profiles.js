import User from '../models/user.js'


async function profileIndex(_req, res, next) {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}


async function profileShow(req, res, next) {
  try {
    const userToShow = await User.findById(req.params.id)
    if (!userToShow) { 
      throw new Error()
    }
    return res.status(200).json(userToShow)
  } catch (err) {
    next(err)
  }
}


async function profileCreate(req, res, next) {
  try {
    const newUser = await User.create(req.body)
    return res.status(200).json(newUser)
  } catch (err) {
    next(err)
  }
}


async function profileUpdate(req, res, next) {
  try {
    const userToUpdate = await User.findById(req.params.id)
    if (!userToUpdate) {
      throw new Error()
    }
    Object.assign(userToUpdate, req.body)
    await userToUpdate.save()
    return res.status(202).json(userToUpdate)
  } catch (err) {
    next(err)
  }
}

async function profileDelete(req, res, next) {
  try {
    const userToDelete = await User.findById(req.params.id)
    if (!userToDelete) {
      throw new Error()
    }
    await userToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}



export default {
  index: profileIndex,
  show: profileShow,
  create: profileCreate,
  update: profileUpdate,
  delete: profileDelete,
}