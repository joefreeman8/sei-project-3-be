import express from 'express'
import users from '../controllers/users.js'
import chat from '../controllers/chats.js'
import secureRoute from '../lib/secureRoute.js'
import auth from '../controllers/auth.js'

const router = express.Router()

router.route('/potentialsniffs')
  .get(users.index)

router.route('/potentialsniffs/:userId')
  .get(secureRoute, users.show)

router.route('/account/:userId')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete)

router.route('/chat')
  .get(secureRoute, chat.chatIndex)
  .post(secureRoute, chat.chatCreate)

router.route('/chat/:chatId')
  .get(secureRoute, chat.chatShow)
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