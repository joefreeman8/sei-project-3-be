import Chat from '../models/chat.js'
import { NotFound, Unauthorized } from '../lib/errors.js'

//* Chat
async function chatIndex(req, res, next) {
  const { currentUserId } = req
  console.log(currentUserId)
  try {
    const chat = await Chat.find()
    console.log(chat)
    const filteredChats = chat.filter(chat => {
      return chat.userOne.equals(currentUserId) || chat.userTwo.equals(currentUserId)
    })
    console.log(filteredChats)
    return res.status(200).json(filteredChats)
  } catch (err) {
    next(err)
  }
}

async function chatShow(req, res, next) {
  const { chatId } = req.params
  try {
    const chat = await Chat.findById(chatId)
    if (!chat) {
      throw new NotFound()
    }
    return res.status(200).json(chat)
  } catch (err) {
    next(err)
  }
}

async function chatCreate(req, res, next) {
  req.body.addedBy = req.currentUser
  try {
    const createdChat = await Chat.create(req.body)
    console.log(createdChat)
    return res.status(200).json(createdChat)
  } catch (err) {
    next(err)
  }
}

async function chatDelete(req, res, next) {
  const { chatId } = req.params
  try {
    const chatToDelete = await Chat.findById(chatId)
    if (!chatToDelete) {
      throw new NotFound()
    }
    if (!chatToDelete.userOne.equals(req.currentUserId)) {
      throw new Unauthorized()
    }
    await chatToDelete.remove()
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
    if (!chat) {
      throw new NotFound()
    }
    if (!chat.userOne.equals(req.currentUserId) && !chat.userTwo.equals(req.currentUserId)) {
      throw new Unauthorized()
    }
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
    if (!chat) {
      throw new NotFound()
    }
    if (!chat.userOne.equals(req.currentUserId)) {
      throw new Unauthorized()
    }
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