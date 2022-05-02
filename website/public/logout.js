const Client = require('../../main').Client
const fs = require('fs')
const jwt = require('jsonwebtoken')
const config = require('../../config.json')
module.exports = {
    name: '/logout',
    run: async (req, res) => {
        res.redirect('/')
}
}