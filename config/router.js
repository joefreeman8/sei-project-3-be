import express from 'express'
import profile from '../controllers/profiles.js'
import chat from '../controllers/chats.js'
import auth from '../controllers/auth.js'
import secureRoute from '/lib/secureRoute.js'

const router = express.Router()

router.route('/potentialsniffs')
  .get(profile.index)
  .post(secureRoute, profile.create)

router.route('/potentialsniffs/:profileId')
  .get(profile.show)
  .put(secureRoute, profile.update)
  .delete(secureRoute, profile.delete)

router.route('/chat')
  .get(secureRoute, profile.chatIndex)

router.route('/chat/:chatId')
  .get(secureRoute, chat.chatShow)
  .post(secureRoute, chat.chatCreate)
  .delete(secureRoute, chat.chatDelete)

router.route('/chat/:chatId/messages')
  .post(secureRoute, chat.messageCreate)

router.route('/chat/:chatId/messages/:messageId')
  .delete(secureRoute, chat.messageDelete)

router.post('/register', auth.register)
router.post('/login', auth.login)

export default router