import Profile from '../models/profile.js'


async function profileIndex(_req, res, next) {
  try {
    const profiles = await Profile.find()
    return res.status(200).json(profiles)
  } catch (err) {
    next(err)
  }
}


async function profileShow(req, res, next) {
  try {
    const profileToShow = await Profile.findById(req.params.id)
    if (!profileToShow) { 
      throw new Error()
    }
    return res.status(200).json(profileToShow)
  } catch (err) {
    next(err)
  }
}


async function profileCreate(req, res, next) {
  try {
    const createdProfile = await Profile.create(req.body)
    return res.status(200).json(createdProfile)
  } catch (err) {
    next(err)
  }
}


async function profileUpdate(req, res, next) {
  try {
    const profileToUpdate = await Profile.findById(req.params.id)
    if (!profileToUpdate) {
      throw new Error()
    }
    Object.assign(profileToUpdate, req.body)
    await profileToUpdate.save()
    return res.status(202).json(profileToUpdate)
  } catch (err) {
    next(err)
  }
}

async function profileDelete(req, res, next) {
  try {
    const profileToDelete = await Profile.findById(req.params.id)
    if (!profileToDelete) {
      throw new Error()
    }
    await profileToDelete.remove()
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