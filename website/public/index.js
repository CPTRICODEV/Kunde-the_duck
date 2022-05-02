const Client = require('../../main').Client
const fs = require('fs')
module.exports = {
    name: '/',
    run: async (req, res) => {
        delete require.cache[require.resolve('../html/home.ejs')];


          
        
        //let file = fs.readFileSync('./website/html/home.html', { encoding: "utf8" })
        res.render("./website/html/home.ejs")
    }
}