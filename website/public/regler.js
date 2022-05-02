const Client = require('../../main').Client
const fs = require('fs')
module.exports = {
    name: '/regler',
    run: async (req, res) => {
        delete require.cache[require.resolve('../html/regler.ejs')];



        let args = {
             users: Client.users.cache.size,
             servers: Client.guilds.cache.size,
             channels: Client.channels.cache.size
        }

          
        
        //let file = fs.readFileSync('./website/html/home.html', { encoding: "utf8" })
        res.render("./FIVEM-WEBSITE/html/regler.ejs", args)
    }
}