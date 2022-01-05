import express from 'express'
import { connectDb } from './db/helpers.js'
import { port } from './config/environment.js'
import errorHandler from './lib/errorHandler.js'
import router from './config/router.js'
import logger from './lib/logger.js'

const app = express()

app.use(express.json())
app.use('/', logger)
app.use(router)
app.use(errorHandler)

async function startServer() {
  try {
    await connectDb()
    console.log('🤖 Mongoose is connected')
    app.listen(port, () => console.log(`🤖 Listening on Port: ${port}`))
  } catch (err) {
    console.log('🤖 Oh no something went wrong')
  }
}

startServer()
