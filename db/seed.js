import profiles from '../controllers/profiles.js'
import Profiles from './data/profiles.js'
import { connectDb, disconnectDb, truncateDb } from './helpers.js'

async function seed() {
  try {
    await connectDb()
    console.log('🤖 Database Connected')

    await truncateDb()
    console.log('🤖 Database Dropped')

    const profiles = await Profiles.create(profiles)
    console.log(`🤖 ${profiles.length} Profiles added to the database`)

    console.log('🤖 Goodbye')

  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)
  }
  disconnectDb
}

seed()