import Profile from '../models/profile.js'
import Chat from '../models/chats.js'

//* Chat
async function chatIndex(_req, res, next) {
  try {
    const chat = await Chat.find()
    return res.status(200).json(chat)
  } catch (err) {
    next(err)
  }
}

async function chatShow(req, res, next) {
  const { chatId } = req.params
  try {
    const chat = await chat.findById(chatId)
    if (!chat) throw new Error()
    return res.status(200).json(chat)
  } catch (err) {
    next(err)
  }
}

async function chatCreate(req, res, next) {
  const { chatId } = req.params
  try {
    const chat = await Profile.findById(chatId)
    if (!chat) throw new Error()
    chat.chat.push(req.body)
    await chat.save()
    return res.status(201).json(chat)
  } catch (err) {
    next(err)
  }
}

async function chatDelete(req, res, next) {
  const { profileId, chatId } = req.params
  try {
    const profile = await Profile.findById(profileId)
    if (!profile) throw new Error()
    const chatToDelete = profile.comments.id(chatId)
    if (!chatToDelete) throw new Error()
    await chatToDelete.remove()
    await profile.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}


//* Message

async function messageCreate(req, res, next) {
  const { chatId } = req.params
  try {
    const chat = await Chat.findById(chatId)
    if (!chat) throw new Error()
    chat.messages.push(req.body)
    await chat.save()
    return res.status(201).json(chat)
  } catch (err) {
    next(err)
  }
}

async function messageDelete(req, res, next) {
  const { chatId, messageId } = req.params
  try {
    const chat = await Chat.findById(chatId)
    if (!chat) throw new Error()
    const messageToDelete = chat.messages.id(messageId)
    if (!messageToDelete) throw new Error()
    await messageToDelete.remove()
    await chat.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}



export default {
  chatIndex,
  chatShow,
  chatCreate,
  chatDelete,
  messageCreate,
  messageDelete,
}