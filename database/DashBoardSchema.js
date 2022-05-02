const mongoose = require('mongoose')
const Schema = mongoose.Schema({
   userID: String,
   access_token: String,
   refresh_token: String,
   expires_in: Number,
   secretAccessKey: String,
   user: {
       id: String,
       username: String,
       discriminator: String,
       avatar: String
   },
   lastUpdated: {
       type: Number,
       default: Date.now
   }
})
const model = mongoose.model('Database', Schema)
module.exports = model;