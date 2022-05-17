import express from 'express'
import { connectDb } from './db/helpers.js'
import logger from './lib/logger.js'
import router from './config/router.js'
import { port } from './config/environment.js'
import errorHandler from './lib/errorHandler.js'
import cors from 'cors'

const app = express()

const corsOptions = {
  origin: true,
}

app.options('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
} )

app.use(express.json())
app.use(cors())
app.use('/', logger)
app.use('/api', router)
app.use(errorHandler)

async function startServer() {
  try {
    await connectDb()
    console.log('🤖 Mongo is Connected')
    app.listen(port, () => console.log(`🤖 Listening on Port: ${port}`))
  } catch (err) {
    console.log('🤖 Something went wrong!')
    console.log(err)
  }
}

startServer()



