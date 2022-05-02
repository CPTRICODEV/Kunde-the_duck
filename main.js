const discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const DiscordOauth2 = require('discord-oauth2')
const cookieParser = require('cookie-parser')

const Client = new discord.Client({
    intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES, discord.Intents.FLAGS.DIRECT_MESSAGES, discord.Intents.FLAGS.GUILD_INTEGRATIONS, discord.Intents.FLAGS.GUILD_MEMBERS, discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, discord.Intents.FLAGS.GUILD_MESSAGE_TYPING],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});
app.enable('trusted proxy')
app.set('etag', false)
app.use(express.static(__dirname + '/website'))
app.set('views', __dirname)
app.set('view engine', 'ejs')
app.use(cookieParser());
process.oauth = new DiscordOauth2({
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENCT_SECRET,
    redirectUri: "http://localhost:4100/callback",
})

Client.commands = new discord.Collection();
Client.aliases = new discord.Collection();
Client.premium = new discord.Collection();
Client.events = new discord.Collection();
Client.SlachCmds = new discord.Collection();
module.exports.Client = Client



require('./mongo')()

 // command Handler
fs.readdirSync('./commands/').forEach(dir => {
    
    fs.readdir(`./commands/${dir}`, (err, files) => {
        
       

        var jsFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        if (jsFiles.length <= 0) return console.log('Kan ikke finde nogen kommandoer!');
        
        jsFiles.forEach(file => {
             var fileget = require(`./commands/${file}`);
            console.log(`File ${file} blev loaded`)
            try{
                Client.commands.set(fileget.help.name, fileget);

                fileget.help.aliases.forEach(alias => {
                    Client.aliases.set(alias, fileget.help.name);
                })
            }catch (err) {
                return console.log(err)
            }
        })
    })
})
// event handler
fs.readdirSync('./events/').forEach(dir => {
    
    fs.readdir(`./events/${dir}`, (err, files) => {
        
       

        var jsFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
        if (jsFiles.length <= 0) return console.log('Kan ikke finde nogen Events!');
        
        jsFiles.forEach(file => {
             const eventget = require(`./events/${file}`);
             console.log(`File ${file} blev loaded`)
            try{
                Client.events.set(eventget.name, eventget);

            }catch (err) {
                return console.log(err)
            }
        })
    })
})

// Slachcommand handler
fs.readdirSync('./SlachCommands/').forEach(dir => {
    
    fs.readdir(`./SlachCommands/${dir}`, (err, files) => {

        var jsFiles = fs.readdirSync('./SlachCommands/').filter(file => file.endsWith('.js'));
        if (jsFiles.length <= 0) return console.log('Kan ikke finde nogen SlachCommands!');
        
        jsFiles.forEach(file => {
             var fileget = require(`./SlachCommands/${file}`);
            try{
                Client.SlachCmds.set(fileget.help.name, fileget);
                console.log(`File ${file} blev loaded`)

            }catch (err) {
                return console.log(err)
            }
        })
    })
})

// Request Handler
let files = fs.readdirSync('./website/public').filter(f => f.endsWith('.js'))
files.forEach(f => {
    const file = require(`./website/public/${f}`)
    if (file && file.name) {
        app.get(file.name, file.run)
    }
})




// dashboard





Client.login(config.Token)
app.listen(4100, () => console.log('Jeg lytter til port 80'))
