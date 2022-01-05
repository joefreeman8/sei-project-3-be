import express from 'express'
import profile from '../controllers/profiles.js'
import chat from '../controllers/chats.js'
import secureRoute from '../lib/secureRoute.js'
import auth from '../controllers/auth.js'

const router = express.Router()

router.route('/potentialsniffs')
  .get(secureRoute, profile.index)

router.route('/potentialsniffs/:profileId')
  .get(secureRoute, profile.show)
  .put(secureRoute, profile.update)
  .delete(secureRoute, profile.delete)

router.route('/chat')
  .get(secureRoute, chat.chatIndex)

router.route('/chat/:chatId')
  .get(secureRoute, chat.chatShow)
  .post(secureRoute, chat.chatCreate)
  .delete(secureRoute, chat.chatDelete)

router.route('/chat/:chatId/messages')
  .post(secureRoute, chat.messageCreate)

router.route('/chat/:chatId/messages/:messageId')
  .delete(secureRoute, chat.messageDelete)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

export default router