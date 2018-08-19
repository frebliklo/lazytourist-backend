const mongoose = require('mongoose')
const { MONGO_USER, MONGO_PWD } = require('../../keys/keys')

const options = {
  auth: {
    user: MONGO_USER,
    password: MONGO_PWD
  },
  useNewUrlParser: true
}

const database = process.env.MONGODB_URI || 'mongodb://localhost:27017/TouristApi'

mongoose.connect(database, options, (err, client) => {
  if(err) {
    return console.log(`Couldn't connect, got following error:\n\n${err}`)
  }
  console.log(`Connected to ${client.name} at ${client.host}`)
})

module.exports = { mongoose }
