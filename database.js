const { MongoClient } = require('mongodb')
const url =
  'mongodb+srv://julianahkd:MbxCUTScB41edRXF@cluster0.osswyay.mongodb.net/'
const dbName = 'api'

module.exports = async function () {
  try {
    const client = new MongoClient(url)
    await client.connect()
    const db = client.db(dbName)
    console.log('MongoDB connected!')
    return db
  } catch (error) {
    console.error(error)
  }
}
