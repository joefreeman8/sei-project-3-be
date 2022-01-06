import profilesData from './data/profiles.js'
import User from '../models/user.js'
import { connectDb, disconnectDb, truncateDb } from './helpers.js'

async function seed() {
  try {
    await connectDb()
    console.log('🤖 Database Connected')

    await truncateDb()
    console.log('🤖 Database Dropped')

    const profiles = await User.create(profilesData)
    console.log(`🤖 ${profiles.length} Profiles added to the database`)

    console.log('🤖 Goodbye')

  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)
  }
  await disconnectDb()
}

seed()