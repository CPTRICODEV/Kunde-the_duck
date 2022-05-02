const Client = require('../../main').Client
const Schema = require('../../database/DashBoardSchema')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const config = require('../../config.json')
module.exports = {
    name: '/admin',
    run: async (req, res) => {
        delete require.cache[require.resolve('../html/admin.ejs')];
        
        if(!req.cookies.token) return res.redirect('/login')
        let decoded;
        try{
            decoded = jwt.verify(req.cookies.token, config.jwt_secret);
        } catch(e) {}

        if (decoded) {
            let data = await Schema.findOne({
                _id: decoded.uuid
            });

            function padTo2Digits(num) {
                return num.toString().padStart(2, '0');
              }

            function formatDate(date) {
                return [
                  padTo2Digits(date.getDate()),
                  padTo2Digits(date.getMonth() + 1),
                  date.getFullYear(),
                ].join('/');
              }

            let args =  {
                avatar: `https://cdn.discordapp.com/avatars/${data.userID}/${data.user.avatar}.png`,
                username: data.user.username,
                discriminator: data.user.discriminator,
                id: data.user.userID,
                timedate: formatDate(new Date()),
                loggedIn: true
            }

            res.render('./website/html/admin.ejs', args)
        }else res.redirect("/login")
    }
}